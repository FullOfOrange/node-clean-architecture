import {SQS} from 'aws-sdk'
import * as AWSHelper from '../aws/helper'

export class AsyncEvent<T> {
    name: string
    payload: T

    copyInto(jsonObject: string) {
        const obj: { name: string, payload: T } = JSON.parse(jsonObject)
        this.name = obj.name
        this.payload = obj.payload
    }
}

const sqs = new SQS({
    region: 'ap-northeast-2',
})

export const eventPublisher = async <T extends object>(event: AsyncEvent<T>) => {
    const QueueUrl = AWSHelper.SQS.getUrl('workerQueue')
    await sqs.sendMessage({
        QueueUrl: QueueUrl,
        MessageBody: JSON.stringify(event),
    }).promise();
}