import {TicketFinder} from "./TicketFinder";
import {Ticket} from "../../domain/ticket/Ticket";
import {inject, injectable} from "tsyringe";

@injectable()
export class TicketService implements TicketFinder {

    constructor() {}

    async findById(id: number): Promise<Ticket> {
        return new Ticket("hi", 1)
    }
}