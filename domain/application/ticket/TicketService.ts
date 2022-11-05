import {TicketFinder} from "./TicketFinder";
import {Ticket} from "../../domain/ticket/Ticket";
import {autoInjectable, inject, injectable} from "tsyringe";
import {TicketRepository} from "../../domain/ticket/TicketRepository";
import {Connection} from "../../data/configuration";

@autoInjectable()
export class TicketService implements TicketFinder {

    constructor(
        @inject(Connection) private conn: Connection,
        @inject(TicketRepository) private ticketRepository: TicketRepository,
    ) {}

    async findById(id: string): Promise<Ticket | undefined> {
        return await this.conn.transaction(async trx => {
            return await this.ticketRepository.findById(id, {trx: trx})
        })
    }
}