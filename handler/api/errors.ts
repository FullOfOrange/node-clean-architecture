import {ExpressError} from "../../common/Errors";

export class NotAuthenticatedError extends ExpressError {
    constructor() {
        super({}, "401.not_authenticated", "Not authenticated")
    }
}