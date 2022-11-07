import * as JWT from 'jsonwebtoken';

const secret = process.env.JWT_SECRET as string;

export const generateToken = <T extends object>(payload: T): string => {
    return JWT.sign(payload, secret);
}

export const verifyToken = <T extends object>(token: string): T => {
    return JWT.verify(token, secret) as T;
}