import {TicketCreateEvent} from "../domain/DomainEvent";
import {EventListener} from "../../common/event/Event";
import {inject, singleton} from "tsyringe";
import {TicketFinder} from "../application/ticket/usecase/TicketFinder";

@singleton()
export class TicketEventHandler {

    constructor(
        @inject(TicketFinder) private ticketFinder: TicketFinder
    ) {
    }

    @EventListener(TicketCreateEvent)
    async ticketCreate(event: TicketCreateEvent) {

        const ticket = await this.ticketFinder.findById(event.payload.ticketId)
        console.log(ticket)
    }
}

