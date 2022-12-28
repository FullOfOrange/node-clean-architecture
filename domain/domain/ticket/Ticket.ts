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
        this.id = input.id ?? undefined
        this.name = input.name
        this.count = input.count
        this.createdBy = input.createdBy
        this.createdAt = input.createdAt ?? new Date()
        this.updatedAt = input.updatedAt ?? new Date()
        this.deletedAt = input.deletedAt
    }

    requireId(): string {
        if (this.id === undefined) throw new TicketNotFoundError()
        return this.id
    }
}