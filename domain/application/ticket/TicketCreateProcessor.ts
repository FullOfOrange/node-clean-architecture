export interface TicketCreateProcessor {

    process(command: TicketCreateCommand): Promise<string>
}

export type TicketCreateCommand = {
    name: string,
    count: number,
}

export const TicketCreateProcessor = Symbol("TicketCreateProcessor")