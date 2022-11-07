import {UserNotFoundError} from "../DomainError";

export class User {

    id?: string = undefined
    email: string
    createdAt: Date = new Date()
    updatedAt: Date = new Date()
    deletedAt?: Date = undefined

    constructor(input: {
        id?: string,
        email: string,
        createdAt?: Date,
        updatedAt?: Date,
        deletedAt?: Date,
    }) {
        const {
            id,
            email,
            createdAt,
            updatedAt,
            deletedAt
        } = input

        this.id = id ?? undefined
        this.email = email
        this.createdAt = createdAt ?? new Date()
        this.updatedAt = updatedAt ?? new Date()
        this.deletedAt = deletedAt
    }

    requireId(): string {
        if (this.id === undefined) throw new UserNotFoundError()
        return this.id
    }
}