import {container} from "tsyringe";
import {TicketService} from "./ticket/TicketService"
import {TicketFinder} from "./ticket/TicketFinder";

// Bean configurations
export const applicationConfiguration = () => {
    container.register(TicketFinder, {useClass: TicketService});
}