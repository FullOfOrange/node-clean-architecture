import {Ticket} from "./Ticket";

export interface TicketRepository {
    findById(id: number): Promise<Ticket>
    save(ticket: Ticket): Promise<Ticket>
}