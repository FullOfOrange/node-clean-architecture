import {TicketRepository} from "../../domain/ticket/TicketRepository";
import {Ticket} from "../../domain/ticket/Ticket";
import {Tickets} from "./Tickets";
import {inject, injectable} from "tsyringe";
import {TransactionManager} from "../../../common/transaction/TransactionManager";

@injectable()
export class KnexTicketRepository implements TicketRepository {

    constructor(
        @inject(TransactionManager) private transactionManager: TransactionManager
    ) {
    }

    async findById(id: string): Promise<Ticket | undefined> {
        const trx = this.transactionManager.getTransaction()

        const result = await Tickets
            .query(trx)
            .select('*')
            .where('id', id)
            .first()

        if (result === undefined) {
            return result
        } else {
            return result?.toTicket()
        }
    }

    async save(ticket: Ticket): Promise<Ticket> {
        const trx = this.transactionManager.getTransaction()

        const object: Partial<Tickets> = {
            id: ticket.id,
            name: ticket.name,
            count: ticket.count,
            createdAt: ticket.createdAt,
            updatedAt: ticket.updatedAt,
            deletedAt: ticket.deletedAt,
        }
        const result = await Tickets.query(trx).upsertGraphAndFetch(object)
        return result.toTicket()
    }
}