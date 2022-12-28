import {TicketFinder} from "./usecase/TicketFinder";
import {Ticket} from "../../domain/ticket/Ticket";
import {inject, singleton} from "tsyringe";
import {TicketRepository} from "../../domain/ticket/TicketRepository";
import {TicketNotFoundError} from "../../domain/DomainError";
import {TicketCreateCommand, TicketCreateProcessor} from "./usecase/TicketCreateProcessor";
import {eventPublisher} from "../../../common/event/Event";
import {TicketCreateEvent} from "../../domain/DomainEvent";
import {TransactionManager} from "../../../common/transaction/TransactionManager";

@singleton()
export class TicketService implements TicketFinder, TicketCreateProcessor {

    constructor(
        @inject(TransactionManager) private transactionManager: TransactionManager,
        @inject(TicketRepository) private ticketRepository: TicketRepository,
    ) {
    }

    async findById(id: string): Promise<Ticket> {
        return await this.transactionManager.init(async () => {
            const ticket = await this.ticketRepository.findById(id)
            if (ticket === undefined) throw new TicketNotFoundError()
            return ticket
        })
    }

    async process(command: TicketCreateCommand): Promise<string> {
        const ticketId = await this.transactionManager.init(async () => {
            const ticket = await this.ticketRepository.save(
                new Ticket({
                    name: command.name,
                    count: command.count,
                    createdBy: command.requesterId
                }),
            )
            return ticket.requireId()
        })

        await eventPublisher<{ ticketId: string }>(new TicketCreateEvent(ticketId))
        return ticketId
    }
}