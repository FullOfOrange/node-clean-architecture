import {Ticket} from "../../domain/ticket/Ticket";

export interface TicketFinder {

    findById(id: string): Promise<Ticket | undefined>
}

export const TicketFinder = Symbol("TicketFinder");