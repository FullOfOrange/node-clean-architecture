import {Ticket} from "../../../domain/ticket/Ticket";

export interface TicketFinder {

    findById(id: string): Promise<Ticket>
}

export const TicketFinder = Symbol("TicketFinder");