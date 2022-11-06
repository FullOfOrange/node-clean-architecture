import 'reflect-metadata'

import {SQSEvent, SQSHandler} from "aws-lambda";
import {AsyncEvent} from "../../common/event/Event";
import {TicketCreateEvent} from "../../domain/domain/DomainEvent";
import {container} from "tsyringe";
import {TicketHandler} from "../../domain/handler/TicketHandler";
import {dataConfiguration} from "../../domain/data/configuration";
import {applicationConfiguration} from "../../domain/application/configuration";
import {handlerConfiguration} from "../../domain/handler/configuration";

dataConfiguration()
applicationConfiguration()
handlerConfiguration()

const ticketHandler: TicketHandler = container.resolve(TicketHandler)

export const handler: SQSHandler = async (sqsEvent: SQSEvent) => {
    const event = new AsyncEvent()
    event.copyInto(sqsEvent.Records[0].body)

    switch (event.name) {
        case 'ticketCreateEvent':
            ticketHandler.ticketCreate(event as TicketCreateEvent)
    }
}