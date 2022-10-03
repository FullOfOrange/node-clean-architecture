import {TicketFinder} from "./TicketFinder";
import {Ticket} from "../domain/ticket/Ticket";
import {TicketRepository} from "../domain/ticket/TicketRepository";
import {inject, singleton} from "tsyringe";

@singleton()
export class TicketService implements TicketFinder {

    constructor(
        @inject("TicketRepository")
        private ticketRepository: TicketRepository
    ) {
    }

    async findById(id: number): Promise<Ticket> {
        return await this.ticketRepository.findById(id);
    }
}