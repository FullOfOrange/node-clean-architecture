import {UserNotFoundError} from "../DomainError";

export class User {

    id?: string = undefined
    email: string
    createdAt: Date = new Date()
    updatedAt: Date = new Date()
    deletedAt?: Date = undefined

    constructor(
        email: string,
        id?: string,
        createdAt?: Date,
        updatedAt?: Date,
        deletedAt?: Date,
    ) {
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