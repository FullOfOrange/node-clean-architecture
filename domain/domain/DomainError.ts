import {ExpressError} from "../../common/Errors";

export class TicketNotFoundError extends ExpressError {
    constructor() {
        super({}, "404.ticket_not_found", "Ticket not found")
    }
}

export class UserNotFoundError extends ExpressError {
    constructor() {
        super({}, "404.user_not_found", "User not found")
    }
}

export class UserAlreadyExistError extends ExpressError {
    constructor() {
        super({}, "400.user_already_exist", "User already exist")
    }
}