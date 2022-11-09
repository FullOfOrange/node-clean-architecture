import {NextFunction, Request, Response} from "express";
import {ExpressError} from "../../../common/Errors";

export const globalErrorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
    if (err instanceof ExpressError) {
        return res
            .status(err.status)
            .send({
                name: err.name,
                message: err.message
            })
    }

    return res
        .status(500)
        .send({
            name: err.name,
            message: err.message,
            stack: err.stack
        })
}