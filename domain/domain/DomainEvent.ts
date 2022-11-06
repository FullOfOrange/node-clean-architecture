import {AsyncEvent} from "../../common/event/Event";

export class TicketCreateEvent extends AsyncEvent<{ ticketId: string }> {

    constructor(ticketId: string) {
        super();
        this.name = 'ticketCreateEvent'
        this.payload = {ticketId}
    }
}