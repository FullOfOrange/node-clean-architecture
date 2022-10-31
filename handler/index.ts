import 'reflect-metadata'
import '../domain'

import * as express from 'express'
import * as serverless from 'serverless-http'
import {ticketController} from "./ticket.controller";

const app = express()
app.use(express.json())
app.use('/ticket', ticketController)

const sls = serverless(app);

export const handler = async (event, context) => {
    return await sls(event, context);
};