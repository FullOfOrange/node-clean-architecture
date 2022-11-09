import {SQS} from 'aws-sdk'
import * as AWSHelper from '../aws/helper'
import {container} from "tsyringe";

const sqs = new SQS({region: 'ap-northeast-2'})

type AsyncEventPayload = {
    className: string,
    eventObject: string,
}

type EventFunctionPayload = {
    eventClass: string,
    className: any,
    functionName: string,
}

const eventClassList: Array<any> = [];
const eventFunctionList: Array<EventFunctionPayload> = [];

/**
 * Method Decorator
 * @param eventClass
 * @constructor
 */
export function EventListener(eventClass) {
    eventClassList.push(eventClass)

    return function (target: any, key: string, desc: PropertyDescriptor): void {
        const payload: EventFunctionPayload = {
            eventClass: eventClass.name,
            className: target.constructor.name,
            functionName: key
        }
        eventFunctionList.push(payload)
    }
}

/**
 * 이벤트를 발행해요.
 * @param event
 */
export const eventPublisher = async <T extends object>(event: AsyncEvent<T>) => {
    const QueueUrl = AWSHelper.SQS.getUrl(event.topic)
    const object: AsyncEventPayload = {
        className: event.constructor.name,
        eventObject: JSON.stringify(event)
    }

    await sqs.sendMessage({
        QueueUrl: QueueUrl,
        MessageBody: JSON.stringify(object),
    }).promise();
}

/**
 * 등록된 핸들러 중에서 이벤트를 실행해요
 * @param eventPayload
 */
export async function runEvent(eventPayload: string) {
    const object: AsyncEventPayload = JSON.parse(eventPayload)
    const findEvent = eventClassList.find((event) => event.name === object.className)
    const event = new findEvent()
    event.copyInto(object.eventObject)

    const foundFunction = eventFunctionList.find(eventFunc => eventFunc.eventClass === event.constructor.name)
    if (foundFunction !== undefined) {
        const handlerInstance = container.resolve<any>(foundFunction.className)
        if (handlerInstance !== undefined) {
            await handlerInstance[foundFunction.functionName](event)
        }
    }
}

export enum AsyncEventTopicEnum {
    DEFAUlT = 'workerQueue',
    FIFO = 'workerFIFOQueue'
}

export class AsyncEvent<T> {
    topic: AsyncEventTopicEnum = AsyncEventTopicEnum.DEFAUlT
    payload: T

    copyInto(jsonObject: string) {
        const obj: { name: string, payload: T } = JSON.parse(jsonObject)
        this.payload = obj.payload
    }
}