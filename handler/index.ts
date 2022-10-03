import '../domain/configuration'

import {APIGatewayProxyEvent, APIGatewayProxyResult} from "aws-lambda";
import {container, inject, injectable} from "tsyringe";
import {TicketFinder} from "../domain/application/TicketFinder";

@injectable()
class Handler {

    constructor(
        @inject("TicketFinder")
        private ticketFinder: TicketFinder
    ) {
    }

    public async hello(event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> {
        const ticket = await this.ticketFinder.findById(1);

        return {
            statusCode: 200,
            body: JSON.stringify(ticket),
        };
    }
}

export const handler = container.resolve(Handler)
export const hello = handler.hello.bind(handler)
