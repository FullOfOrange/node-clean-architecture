import {TicketNotFoundError} from "../DomainError";

export class Ticket {

    id?: string = undefined
    name: string
    count: number
    createdBy: string
    createdAt: Date = new Date()
    updatedAt: Date = new Date()
    deletedAt?: Date = undefined

    constructor(input: {
        id?: string,
        name: string,
        count: number,
        createdBy: string,
        createdAt?: Date,
        updatedAt?: Date,
        deletedAt?: Date,
    }) {
        const {
            id,
            name,
            count,
            createdBy,
            createdAt,
            updatedAt,
            deletedAt
        } = input

        this.id = id ?? undefined
        this.name = name
        this.count = count
        this.createdBy = createdBy
        this.createdAt = createdAt ?? new Date()
        this.updatedAt = updatedAt ?? new Date()
        this.deletedAt = deletedAt
    }

    requireId(): string {
        if (this.id === undefined) throw new TicketNotFoundError()
        return this.id
    }
}