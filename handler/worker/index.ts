import 'reflect-metadata'

import {SQSEvent, SQSHandler} from "aws-lambda";
import {runEvent} from "../../common/event/Event";
import {dataConfiguration} from "../../domain/data/configuration";
import {applicationConfiguration} from "../../domain/application/configuration";
import {handlerConfiguration} from "../../domain/handler/configuration";

dataConfiguration()
applicationConfiguration()
handlerConfiguration()


export const handler: SQSHandler = async (sqsEvent: SQSEvent) => await runEvent(sqsEvent.Records[0].body)

export const fifoHandler: SQSHandler = async (sqsEvent: SQSEvent) => {
}