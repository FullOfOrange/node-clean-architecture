import {container} from "tsyringe";
import {TypeormTicketRepository} from "./typeorm/TypeormTicketRepository";

// Bean configurations
export const dataConfiguration = () => {
    container.register("TicketRepository", {useClass: TypeormTicketRepository})
}