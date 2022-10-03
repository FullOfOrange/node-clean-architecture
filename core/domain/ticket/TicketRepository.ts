import {Ticket} from "./Ticket";

interface TicketRepository {
    findById(id: number): Promise<Ticket>
    save(ticket: Ticket): Promise<Ticket>
}

export { TicketRepository }