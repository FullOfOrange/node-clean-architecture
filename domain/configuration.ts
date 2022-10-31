import {container} from "tsyringe";
import {TicketService} from "./application/ticket/TicketService"
import {TicketFinder} from "./application/ticket/TicketFinder";

// Bean configurations
export const applicationConfiguration = () => {
    container.register(TicketFinder, {useClass: TicketService});
}