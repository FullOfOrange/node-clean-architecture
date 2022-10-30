import {container} from "tsyringe";
import {TicketService} from "./application/ticket/TicketService"

// Bean configurations
export const applicationConfiguration = () => {
    container.register("TicketFinder", {useClass: TicketService});
}