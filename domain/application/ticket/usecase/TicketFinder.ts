import {Ticket} from "../../../domain/ticket/Ticket";

export interface TicketFinder {

    findById(id: string): Promise<TicketDetail>
}

export const TicketFinder = Symbol("TicketFinder");

export class TicketDetail {
    id: string
    name: string
    count: number
    createdBy: string
    createdAt: Date
    updatedAt: Date
    deletedAt?: Date

    constructor(ticket: Ticket) {
        this.id = ticket.requireId()
        this.name = ticket.name
        this.count = ticket.count
        this.createdBy = ticket.createdBy
        this.createdAt = ticket.createdAt
        this.updatedAt = ticket.updatedAt
        this.deletedAt = ticket.deletedAt
    }
}
