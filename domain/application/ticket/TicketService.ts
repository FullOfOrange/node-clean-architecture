import {TicketFinder} from "./usecase/TicketFinder";
import {Ticket} from "../../domain/ticket/Ticket";
import {autoInjectable, inject, singleton} from "tsyringe";
import {TicketRepository} from "../../domain/ticket/TicketRepository";
import {Connection} from "../../data/configuration";
import {TicketNotFoundError} from "../../domain/DomainError";
import {TicketCreateCommand, TicketCreateProcessor} from "./usecase/TicketCreateProcessor";
import {eventPublisher} from "../../../common/event/Event";
import {TicketCreateEvent} from "../../domain/DomainEvent";
import {UserRepository} from "../../domain/user/UserRepository";

@singleton()
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
        const ticketId = await this.conn.transaction(async trx => {
            const ticket = await this.ticketRepository.save(
                new Ticket({
                    name: command.name,
                    count: command.count,
                    createdBy: command.requesterId
                }),
                {trx: trx}
            )
            return ticket.requireId()
        })

        await eventPublisher<{ ticketId: string }>(new TicketCreateEvent(ticketId))
        return ticketId
    }
}