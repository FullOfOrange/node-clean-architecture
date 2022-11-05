import 'reflect-metadata'
import 'express-async-errors'
import '../../domain'

import * as express from 'express'
import * as serverless from 'serverless-http'
import {ticketController} from "./controller/TicketController";
import {ExpressError} from "../../library/Errors";
import {NextFunction, Request, Response} from "express";

const app = express()
app.use(express.json())
app.use('/ticket', ticketController)
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    if (err instanceof ExpressError) {
        res.status(err.status)
        return res.send({
            name: err.name,
            message: err.message
        })
    }

    return res.sendStatus(500)
})

const sls = serverless(app);

export const handler = async (event, context) => {
    return await sls(event, context);
};