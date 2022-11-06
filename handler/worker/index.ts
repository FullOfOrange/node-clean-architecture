import 'reflect-metadata'
import '../../domain'
import {SQSEvent, SQSHandler} from "aws-lambda";
import {AsyncEvent} from "../../common/event/Event";
import {TicketCreateEvent} from "../../domain/domain/DomainEvent";

export const handler: SQSHandler = (sqsEvent: SQSEvent) => {
    const event = new AsyncEvent()
    event.copyInto(sqsEvent.Records[0].body)

    switch (event.name) {
        case 'ticketCreateEvent': {
            const ticketCreateEvent = event as TicketCreateEvent
            console.log(ticketCreateEvent.payload.ticketId)
        }
    }
}