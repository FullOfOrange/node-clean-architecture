import {SQS} from 'aws-sdk'

export type AsyncEvent<T> = {
    name: string,
    payload: T,
}

export const eventPublisher = async <T> (event: AsyncEvent<T>) => {
    const sqs = new SQS()
}