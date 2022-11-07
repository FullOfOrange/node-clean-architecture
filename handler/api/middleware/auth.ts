import {NextFunction, Request, Response} from "express";
import {User} from "../../../domain/domain/user/User";
import {container} from "tsyringe";
import {UserFinder} from "../../../domain/application/user/usecase/UserFinder";
import {verifyToken} from "../libs";
import {NotAuthenticatedError} from "../errors";

export type AuthTokenType = { userId: string }
export type AuthResponseLocals = {
    user?: User;
}

const authTokenKey = "x-auth-token"
const userFinder: UserFinder = container.resolve(UserFinder)

export const authMiddleware = async (req: Request, res: Response<any, AuthResponseLocals>, next: NextFunction) => {
    const token = req.header(authTokenKey)

    if (token !== undefined) {
        const {userId} = verifyToken<AuthTokenType>(token)
        res.locals.user = await userFinder.findById(userId)
    }
    next()
}

export const needAuthMiddleware = (req: Request, res: Response<any, AuthResponseLocals>, next: NextFunction) => {
    const {user} = res.locals
    if (user === undefined) throw new NotAuthenticatedError()
    next()
}