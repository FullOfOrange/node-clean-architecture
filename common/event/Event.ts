import {SQS} from 'aws-sdk'
import * as AWSHelper from '../aws/helper'
import {container} from "tsyringe";

const sqs = new SQS({region: 'ap-northeast-2'})
const eventClassList: Array<any> = [];
const eventFunctionList: Array<EventFunctionPayload> = [];

type AsyncEventPayload = {
    className: string,
    eventObject: string,
}

type EventFunctionPayload = {
    eventClass: string,
    className: any,
    functionName: string,
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

/**
 * Method Decorator
 * @param eventClass
 * @constructor
 */
export function EventListener(eventClass: Function) {
    // 이벤트 클래스를 받아 주입
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
    // Decorator 에 의해 저장된 이벤트 클래스 꺼냄
    const findEvent = eventClassList.find((event) => event.name === object.className)
    if (findEvent === undefined) return
    // 새로운 인스턴스 생성
    const event = new findEvent()
    // 데이터 주입
    event.copyInto(object.eventObject)

    // 등록된 함수 리스트에서 함수 꺼내기
    const foundFunction = eventFunctionList.find(eventFunc => eventFunc.eventClass === event.constructor.name)
    // 만약 등록 안되어있는 이벤트라면 스킵
    if (foundFunction === undefined) return

    const handlerInstance = container.resolve<any>(foundFunction.className)
    if (handlerInstance !== undefined) return

    await handlerInstance[foundFunction.functionName](event)
}
