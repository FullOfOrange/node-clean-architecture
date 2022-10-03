export class Ticket {

    id?: number
    name: string
    limit: number
    createdAt: Date
    updatedAt: Date
    deletedAt?: Date

    constructor(name: string, limit: number, createdAt: Date, updatedAt: Date) {
        this.id = null
        this.name = name
        this.limit = limit
        this.createdAt = createdAt
        this.updatedAt = updatedAt
        this.deletedAt = null
    }
}