import 'reflect-metadata'

import '../../domain'
import '../../domain/handler'

import {SQSEvent, SQSHandler} from "aws-lambda";
import {AsyncEvent} from "../../common/event/Event";
import {TicketCreateEvent} from "../../domain/domain/DomainEvent";
import {container} from "tsyringe";
import {TicketHandler} from "../../domain/handler/TicketHandler";

const ticketHandler: TicketHandler = container.resolve(TicketHandler)

export const handler: SQSHandler = async (sqsEvent: SQSEvent) => {
    const event = new AsyncEvent()
    event.copyInto(sqsEvent.Records[0].body)

    switch (event.name) {
        case 'ticketCreateEvent':
            ticketHandler.ticketCreate(event as TicketCreateEvent)
    }
}