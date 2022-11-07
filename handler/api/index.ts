import 'reflect-metadata'
import 'express-async-errors'

import {applicationConfiguration} from "../../domain/application/configuration";
import {dataConfiguration} from "../../domain/data/configuration";

dataConfiguration()
applicationConfiguration()

import * as express from 'express'
import * as serverless from 'serverless-http'
import {globalErrorHandler} from "./middleware/error";
import {authMiddleware} from "./middleware/auth";
import {ticketController} from "./controller/TicketController";
import {authController} from "./controller/AuthController";

const app = express()
app.use(express.json())
app.use(authMiddleware)
app.use('/api/v1/tickets', ticketController)
app.use('/api/v1/users', authController)
app.use(globalErrorHandler)

const sls = serverless(app);

export const handler = async (event, context) => {
    return await sls(event, context);
};