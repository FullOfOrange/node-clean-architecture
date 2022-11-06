import 'reflect-metadata'
import 'express-async-errors'
import '../../domain'

import * as express from 'express'
import * as serverless from 'serverless-http'
import {ticketController} from "./controller/TicketController";
import {globalErrorHandler} from "./controller/libs";

const app = express()
app.use(express.json())
app.use('/ticket', ticketController)
app.use(globalErrorHandler)

const sls = serverless(app);

export const handler = async (event, context) => {
    return await sls(event, context);
};