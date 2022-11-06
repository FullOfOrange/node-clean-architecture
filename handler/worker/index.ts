import 'reflect-metadata'
import '../../domain'
import {SQSEvent, SQSHandler} from "aws-lambda";

export const handler: SQSHandler = (sqsEvent: SQSEvent) => {
    const event = sqsEvent.Records[0]
    console.log(event)
}