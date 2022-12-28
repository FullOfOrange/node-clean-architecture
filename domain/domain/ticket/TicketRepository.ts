import {Ticket} from "./Ticket";

export interface TicketRepository {

    findById(id: string): Promise<Ticket | undefined>

    save(ticket: Ticket): Promise<Ticket>
}

export const TicketRepository = Symbol("TicketRepository");