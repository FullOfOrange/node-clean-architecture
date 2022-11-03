import {Ticket} from "./Ticket";
import {Knex} from "knex";

export interface TicketRepository {

    findById(id: number, {trx}: { trx: Knex.Transaction }): Promise<Ticket | undefined>

    save(ticket: Ticket, {trx}: { trx: Knex.Transaction }): Promise<Ticket>
}

export const TicketRepository = Symbol("TicketRepository");