import {TicketFinder} from "./TicketFinder";
import {Ticket} from "../../domain/ticket/Ticket";
import {inject, injectable} from "tsyringe";
import {TicketRepository} from "../../domain/ticket/TicketRepository";
import {knexConnection} from "../../data/configuration";

@injectable()
export class TicketService implements TicketFinder {

    constructor(
        @inject(TicketRepository) private ticketRepository: TicketRepository,
    ) {}

    async findById(id: number): Promise<Ticket | undefined> {
        return await knexConnection.transaction(async trx => {
            return await this.ticketRepository.findById(id, {trx: trx})
        })
    }
}