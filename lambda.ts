require("source-map-support/register");
import serverlessExpress from "@vendia/serverless-express";
import app from "./app";

// eslint-disable-next-line   @typescript-eslint/no-explicit-any
let serverlessExpressInstance: any;

// eslint-disable-next-line   @typescript-eslint/no-explicit-any
async function setup(event: any, context: any) {
  // TODO: connect to DB here
  serverlessExpressInstance = serverlessExpress({ app });
  return serverlessExpressInstance(event, context);
}

// eslint-disable-next-line   @typescript-eslint/no-explicit-any
function handler(event: any, context: any) {
  if (serverlessExpressInstance)
    return serverlessExpressInstance(event, context);

  return setup(event, context);
}

exports.handler = handler;
