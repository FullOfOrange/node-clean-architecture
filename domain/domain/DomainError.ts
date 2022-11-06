import {ExpressError} from "../../common/Errors";

export class TicketNotFoundError extends ExpressError {
    constructor() {
        super({}, "404.not_found", "Ticket not found")
    }
}