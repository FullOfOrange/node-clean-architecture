import {container} from "tsyringe";
import {TicketService} from "./ticket/TicketService"
import {TicketFinder} from "./ticket/usecase/TicketFinder";
import {TicketCreateProcessor} from "./ticket/usecase/TicketCreateProcessor";

// Bean configurations
export const applicationConfiguration = () => {
    container.registerSingleton(TicketFinder, TicketService);
    container.registerSingleton(TicketCreateProcessor, TicketService)
}
