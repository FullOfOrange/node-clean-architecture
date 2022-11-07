import {container} from "tsyringe";
import {TicketService} from "./ticket/TicketService"
import {TicketFinder} from "./ticket/usecase/TicketFinder";
import {TicketCreateProcessor} from "./ticket/usecase/TicketCreateProcessor";
import {UserService} from "./user/UserService";
import {UserFinder} from "./user/usecase/UserFinder";
import {UserCreateProcessor} from "./user/usecase/UserCreateProcessor";

// Bean configurations
export const applicationConfiguration = () => {
    container.registerSingleton(TicketFinder, TicketService)
    container.registerSingleton(TicketCreateProcessor, TicketService)
    container.registerSingleton(UserFinder, UserService)
    container.registerSingleton(UserCreateProcessor, UserService)
}
