export class Ticket {

    id?: number = undefined
    name: string
    limit: number
    createdAt: Date = new Date()
    updatedAt: Date = new Date()
    deletedAt?: Date = undefined

    constructor(name: string, limit: number) {
        this.name = name
        this.limit = limit
    }
}