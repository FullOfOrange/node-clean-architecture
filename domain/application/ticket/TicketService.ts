import {TicketFinder} from "./TicketFinder";
import {Ticket} from "../../domain/ticket/Ticket";
import {TicketRepository} from "../../domain/ticket/TicketRepository";
import {inject, injectable} from "tsyringe";
import {Transactional} from "typeorm-transactional-cls-hooked";

@injectable()
export class TicketService implements TicketFinder {

    constructor(
        @inject("TicketRepository")
        private ticketRepository: TicketRepository
    ) {
    }

    @Transactional()
    async findById(id: number): Promise<Ticket> {
        return await this.ticketRepository.findById(id);
    }
}