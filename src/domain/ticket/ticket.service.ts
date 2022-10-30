import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@mikro-orm/nestjs";
import {Ticket} from "./ticket";
import {EntityRepository} from "@mikro-orm/core";

@Injectable()
export class TicketService {
    constructor(
        @InjectRepository(Ticket)
        private readonly ticketRepository: EntityRepository<Ticket>,
    ) {}

    async createTicket(name: string, limit: number): Promise<Ticket> {
}