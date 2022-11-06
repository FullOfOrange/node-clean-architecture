import {TicketFinder} from "./TicketFinder";
import {Ticket} from "../../domain/ticket/Ticket";
import {autoInjectable, inject} from "tsyringe";
import {TicketRepository} from "../../domain/ticket/TicketRepository";
import {Connection} from "../../data/configuration";
import {TicketNotFoundError} from "../../domain/DomainError";
import {TicketCreateCommand, TicketCreateProcessor} from "./TicketCreateProcessor";

@autoInjectable()
export class TicketService implements TicketFinder, TicketCreateProcessor {

    constructor(
        @inject(Connection) private conn: Connection,
        @inject(TicketRepository) private ticketRepository: TicketRepository,
    ) {
    }

    async findById(id: string): Promise<Ticket> {
        return await this.conn.transaction(async trx => {
            const ticket = await this.ticketRepository.findById(id, {trx: trx})
            if (ticket === undefined) throw new TicketNotFoundError()
            return ticket
        })
    }

    async process(command: TicketCreateCommand): Promise<string> {
        return await this.conn.transaction(async trx => {
            const ticket = await this.ticketRepository.save(
                new Ticket(command.name, command.count),
                {trx: trx}
            )
            return ticket.id!!
        })
    }
}