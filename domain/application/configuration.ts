import {container} from "tsyringe";
import {TicketService} from "./ticket/TicketService"
import {TicketFinder} from "./ticket/TicketFinder";
import {TicketRepository} from "../domain/ticket/TicketRepository";

// Bean configurations
export const applicationConfiguration = () => {
    container.register(TicketFinder, {useClass: TicketService});
}