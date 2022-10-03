import {TicketRepository} from "../../domain/ticket/TicketRepository";
import {Ticket} from "../../domain/ticket/Ticket";
import {injectable} from "tsyringe";

@injectable()
export class TypeormTicketRepository implements TicketRepository {

    findById(id: number): Promise<Ticket> {
        const now = new Date();
        return Promise.resolve(new Ticket("ticket", 1, now, now))
    }

    save(ticket: Ticket): Promise<Ticket> {
        const now = new Date();
        return Promise.resolve(new Ticket("ticket", 1, now, now))
    }
}