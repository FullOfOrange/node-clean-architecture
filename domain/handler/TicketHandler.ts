import {TicketCreateEvent} from "../domain/DomainEvent";

export const TicketHandler = Symbol('TicketHandler')

export interface TicketHandler {
    ticketCreate(event: TicketCreateEvent): void
}

export class TicketEventHandler implements TicketHandler {

    ticketCreate(event: TicketCreateEvent) {
        console.log(event.payload.ticketId)
    }
}

