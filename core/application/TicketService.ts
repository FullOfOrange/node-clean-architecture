import {TicketFinder} from "./TicketFinder";
import {Service} from "typedi";
import {Ticket} from "../domain/ticket/Ticket";
import {TicketRepository} from "../domain/ticket/TicketRepository";

@Service({name: "TicketFinder"})
class TicketService implements TicketFinder {

    constructor(
        private ticketRepository: TicketRepository
    ) {
    }

    async findById(id: number): Promise<Ticket> {
        return await this.ticketRepository.findById(id);
    }
}