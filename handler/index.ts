import '../core/index'

import {APIGatewayProxyEvent, APIGatewayProxyResult} from "aws-lambda";
import {container} from "tsyringe";
import {TicketFinder} from "../core/application/TicketFinder";

export const hello = async (
    event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {

    const ticketFinder: TicketFinder = container.resolve("TicketFinder");
    const ticket = await ticketFinder.findById(1)

    return {
        statusCode: 200,
        body: JSON.stringify(
            {
                message: "Go Serverless v3.0! Your function executed successfully!",
                input: event,
            },
            null,
            2
        ),
    };
};
