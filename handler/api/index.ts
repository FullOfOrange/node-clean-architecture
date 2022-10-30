import { MikroORM } from '@mikro-orm/core';
import type { MySqlDriver } from '@mikro-orm/mysql';
import {Ticket} from "../../domain/domain/ticket/Ticket";
import {APIGatewayProxyEvent, APIGatewayProxyResult} from "aws-lambda"; // or any other driver package

import serverlessExpress from '@vendia/serverless-express'
const app = require('./app')

let serverlessExpressInstance

async function asyncTask () {
  const orm = await MikroORM.init<MySqlDriver>({
    entitiesTs: [Ticket], // path to our TS entities (src), relative to `baseDir`
    dbName: 'reservation',
    type: 'mysql',
  });
  console.log(orm.em); // access EntityManager via `em` property
}

async function setup (event, context) {
  const asyncValue = await asyncTask()
  console.log(asyncValue)
  serverlessExpressInstance = serverlessExpress({ app })
  return serverlessExpressInstance(event, context)
}

function handler (event, context) {
  if (serverlessExpressInstance) return serverlessExpressInstance(event, context)

  return setup(event, context)
}

exports.handler = handler