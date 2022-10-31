import {Ticket} from "../../domain/ticket/Ticket";

export interface TicketFinder {

    findById(id: number): Promise<Ticket>
}

export const TicketFinder = Symbol("TicketFinder");