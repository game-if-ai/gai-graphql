import express, { Express } from "express";
import { graphqlHTTP } from "express-graphql";
import bodyParser from "body-parser";
import cors from "cors";
import publicSchema from "./schemas/publicSchema";
import * as dotenv from "dotenv";
dotenv.config();

const CORS_ORIGIN = process.env.CORS_ORIGIN
  ? process.env.CORS_ORIGIN.split(",")
  : ["https://dev.gameifai.org"];

//START MIDDLEWARE
import mongoose from "mongoose";
import privateSchema from "./schemas/privateSchema";
import requireEnv from "./utils/require-env";

// eslint-disable-next-line   @typescript-eslint/no-explicit-any
const authorization = (req: any, res: any, next: any) => {
  if (process.env.ENV === "dev") {
    return next();
  }

  if (!req.body.data || !req.body.data.secret) {
    console.log(`failed to authorize, expected body`);
    return res
      .status(403)
      .send({ error: `failed to authorize, expected body` });
  }
  //when sending from postman: req.body.secret, else from webpage: req.body.data.secret
  const secret = req.body.data.secret;
  if (!secret) {
    console.log(`failed to authorize, expected secret`);
    return res
      .status(403)
      .send({ error: `failed to authorize, expected secret` });
  }
  if (secret !== process.env.GQL_SECRET) {
    console.log(`failed to authorize, secrets do not match`);
    return res
      .status(403)
      .send({ error: `failed to authorize, secret does not match` });
  }
  return next();
};

const corsOptions = {
  credentials: true,
  origin: function (
    origin: string | undefined,
    callback: (err: Error | null, allow?: string) => void
  ) {
    if (!origin) {
      callback(null, "");
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
const connectWithRetry = function (uri?: string) {
  const mongoUri =
    uri ||
    process.env.MONGO_URI ||
    `mongodb://${requireEnv("MONGO_USER")}:${requireEnv(
      "MONGO_PASSWORD"
    )}@${requireEnv("MONGO_HOST")}/${requireEnv("MONGO_DB")}${
      process.env.MONGO_QUERY_STRING || ""
    }`;
  mongoose.set("strictQuery", false);
  console.log(`connecting to uri: ${mongoUri}`);
  return mongoose.connect(mongoUri, function (err) {
    if (err) {
      console.error(
        "Failed to connect to mongo on startup - retrying in 30 sec",
        err
      );
      setTimeout(connectWithRetry, 30000);
    }
  });
};

export function appStart() {
  connectWithRetry();
  mongoose.connection.on("error", (err) => {
    console.log("Error after connection:");
    console.log(err);
  });

  mongoose.connection.once("open", () => {
    console.log("connected to database");
  });
}

export async function appStop(): Promise<void> {
  try {
    mongoose.connection.removeAllListeners();
    await mongoose.disconnect();
  } catch (err) {
    console.error("error on mongoose disconnect: " + err);
  }
}

export function createApp(): Express {
  const app = express();
  app.use(bodyParser.urlencoded({ extended: true, limit: "5mb" }));
  app.use(express.json());
  app.use(cors(corsOptions));
  app.use(
    "/graphqlPrivate",
    authorization,
    graphqlHTTP({
      schema: privateSchema, // private due to authorization
      graphiql: true,
    })
  );

  app.use(
    "/graphql",
    graphqlHTTP((req, res) => {
      // res.setHeader('Access-Control-Allow-Origin', '*');
      return {
        schema: publicSchema,
        graphiql: true,
      };
    })
  );
  return app;
}

export default createApp;
