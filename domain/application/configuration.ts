import {container} from "tsyringe";
import {TicketService} from "./ticket/TicketService"
import {TicketFinder} from "./ticket/TicketFinder";
import {TicketCreateProcessor} from "./ticket/TicketCreateProcessor";

// Bean configurations
export const applicationConfiguration = () => {
    container.registerSingleton(TicketFinder, TicketService);
    // container.registerSingleton(TicketCreateProcessor, TicketService)
}