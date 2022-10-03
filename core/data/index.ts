import {container} from "tsyringe";
import {TypeormTicketRepository} from "./typeorm/TypeormTicketRepository";

(() => {
    container.register("TicketRepository", {useClass: TypeormTicketRepository})
})();