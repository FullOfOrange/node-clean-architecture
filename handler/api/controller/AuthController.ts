import {Request, Response, Router} from "express";
import {UserFinder} from "../../../domain/application/user/usecase/UserFinder";
import {container} from "tsyringe";
import {UserCreateProcessor} from "../../../domain/application/user/usecase/UserCreateProcessor";
import {AuthResponseLocals, AuthTokenType} from "../middleware/auth";
import {NotAuthenticatedError} from "../errors";
import {generateToken} from "../libs";

export const authController = Router()

const userFinder: UserFinder = container.resolve(UserFinder)
const userCreateProcessor: UserCreateProcessor = container.resolve(UserCreateProcessor)

type MeResponse = {
    user: {
        id: string;
        email: string;
        createdAt: Date;
    }
}

/**
 * @api {get} /api/v1/users/me
 * 내 정보 확인 API
 */
authController.get("/me", async (req: Request, res: Response<MeResponse, AuthResponseLocals>) => {
    const {user} = res.locals
    if (user === undefined) throw new NotAuthenticatedError()

    res.send({
        user: {
            id: user.requireId(),
            email: user.email,
            createdAt: user.createdAt,
        }
    })
})

type UserCreateRequest = {
    email: string;
}

type UserCreateResponse = {
    user: {
        id: string;
        email: string;
        createdAt: Date;
    }
}

/**
 * @api {post} /api/v1/users
 * 회원가입 API
 */
authController.post("/", async (req: Request, res: Response<UserCreateResponse, AuthResponseLocals>) => {
    const {email} = req.body as UserCreateRequest

    const id = await userCreateProcessor.process({email})
    const createdUser = await userFinder.findById(id)

    res.send({
        user: {
            id: createdUser.requireId(),
            email: createdUser.email,
            createdAt: createdUser.createdAt,
        }
    })
})

type LoginRequest = {
    email: string;
}

type LoginResponse = {
    token: string;
}

/**
 * @api {post} /api/v1/users/login
 */
authController.post("/login", async (req: Request, res: Response<LoginResponse, AuthResponseLocals>) => {
    const {email} = req.body as LoginRequest
    const user = await userFinder.findByEmail(email)
    const token = generateToken<AuthTokenType>({userId: user.requireId()})
    res.send({token})
})