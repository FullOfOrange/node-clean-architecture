import {container} from "tsyringe";
import {TicketService} from "./application/TicketService"

// Bean configurations
export const applicationConfiguration = () => {
    container.register("TicketFinder", {useClass: TicketService});
}