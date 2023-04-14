import express from 'express'
import { graphqlHTTP } from 'express-graphql';
import bodyParser from 'body-parser'
import cors from 'cors';
import publicSchema from './schemas/publicSchema'
require('dotenv').config()

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

const CORS_ORIGIN = process.env.CORS_ORIGIN
  ? process.env.CORS_ORIGIN.split(',')
  : [
      'https://dev.gameifai.org',
    ]; 


//START MIDDLEWARE
import mongoose from 'mongoose'
import { verifyQueryPayload } from './helpers';
import privateSchema from './schemas/privateSchema';
const mongoUrl = `${process.env.ENV === "dev" ? "mongodb://localhost:27017/TestDB" : process.env.MONGO_URI}`

var connectWithRetry = function() {
  console.log(`connecting to uri: ${mongoUrl}`)
    return mongoose.connect(mongoUrl, function(err) {
      if (err) {
        console.error('Failed to connect to mongo on startup - retrying in 30 sec', err);
        setTimeout(connectWithRetry, 30000);
      }
    });
  };
connectWithRetry();

mongoose.connection.on('error', err => {
    console.log("Error after connection:")
    console.log(err);
  });

mongoose.connection.once('open', () => {
    console.log('connected to database');
});

// @ts-ignore
const authorization = (req, res, next) => {
    if(process.env.ENV ==="dev"){
      return next();
    }

    if(!req.body.data || !req.body.data.secret){
        console.log(`failed to authorize, expected body`)
        return res.status(403).send({"error": `failed to authorize, expected body`});
    }
    //when sending from postman: req.body.secret, else from webpage: req.body.data.secret
    const secret = req.body.data.secret
    if (!secret) {
        console.log(`failed to authorize, expected secret`)
        return res.status(403).send({"error": `failed to authorize, expected secret`});
    }
    if(secret !== process.env.GQL_SECRET){
        console.log(`failed to authorize, secrets do not match`)
        return res.status(403).send({"error": `failed to authorize, secret does not match`});
    }
    return next();
  };

// @ts-ignore
const verifyQuery = (req, res, next) =>{
  // Make sure the payload is only what it needs to be and not malicious
  verifyQueryPayload(req, res)
  // TODO: Whitelist queries?
  console.log("verified")
  return next();
}

const corsOptions = {
  credentials: true,
  origin: function (
    origin: string | undefined,
    callback: (err: Error | null, allow?: string) => void
  ) {
    if (!origin) {
      callback(new Error("no origin provided"), '');
    } else {
      let allowOrigin = false;
      for (const co of CORS_ORIGIN) {
        if (origin === co || origin.endsWith(co)) {
          allowOrigin = true;
          break;
        }
      }
      if (allowOrigin) {
        callback(null, origin);
      } else {
        callback(new Error(`${origin} not allowed by CORS`));
      }
    }
  },
};
app.use(cors(corsOptions));
app.use('/graphqlPrivate', authorization, graphqlHTTP({
    schema: privateSchema, // private due to authorization
    graphiql: true
}));

app.use('/graphql', graphqlHTTP((req,res)=>{
  // res.setHeader('Access-Control-Allow-Origin', '*');
  return {
    schema: publicSchema,
    graphiql: true,
  }
}));

// Public since no authorization
// app.use('/graphqlClient', graphqlHTTP({
//   schema: publicSchema,
//   graphiql: true,
// }));

export default app