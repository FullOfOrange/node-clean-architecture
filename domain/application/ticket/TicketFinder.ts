import {Ticket} from "../../domain/ticket/Ticket";

export interface TicketFinder {

    findById(id: number): Promise<Ticket>
}