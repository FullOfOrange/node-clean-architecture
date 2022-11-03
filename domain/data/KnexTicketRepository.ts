import {TicketRepository} from "../domain/ticket/TicketRepository";
import {Ticket} from "../domain/ticket/Ticket";
import {Knex} from "knex";
import {Tickets} from "./Tickets";
import {injectable} from "tsyringe";

@injectable()
export class KnexTicketRepository implements TicketRepository {

    async findById(id: number, {trx}: { trx: Knex.Transaction }): Promise<Ticket | undefined> {
        const result = await Tickets
            .query(trx)
            .select('*')
            .where('id', id)
            .first()

        return result?.toTicket()
    }

    async save(ticket: Ticket, {trx}: { trx: Knex.Transaction }): Promise<Ticket> {
        const object: Partial<Tickets> = {
            id: ticket.id,
            name: ticket.name,
            count: ticket.count,
            createdAt: ticket.createdAt,
            updatedAt: ticket.updatedAt,
            deletedAt: ticket.deletedAt,
        }

        const updatedTicket = await Tickets.query(trx).upsertGraphAndFetch(object)
        return updatedTicket.toTicket()
    }
}