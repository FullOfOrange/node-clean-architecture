import {container} from "tsyringe";
import {TicketEventHandler, TicketHandler} from "./TicketHandler";

export const handlerConfiguration = () => {
    container.registerSingleton(TicketHandler, TicketEventHandler)
}