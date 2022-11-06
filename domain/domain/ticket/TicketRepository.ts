import {Ticket} from "./Ticket";
import {Transaction} from "../../data/configuration";

export interface TicketRepository {

    findById(id: string, {trx}: { trx: Transaction }): Promise<Ticket | undefined>

    save(ticket: Ticket, {trx}: { trx: Transaction }): Promise<Ticket>
}

export const TicketRepository = Symbol("TicketRepository");