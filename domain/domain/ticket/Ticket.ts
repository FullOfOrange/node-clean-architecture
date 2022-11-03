export class Ticket {

    id?: string = undefined
    name: string
    count: number
    createdAt: Date = new Date()
    updatedAt: Date = new Date()
    deletedAt?: Date = undefined

    constructor(
        id: string | undefined,
        name: string,
        count: number,
        createdAt: Date,
        updatedAt: Date,
        deletedAt?: Date,
    ) {
        this.id = id
        this.name = name
        this.count = count
        this.createdAt = createdAt
        this.updatedAt = updatedAt
        this.deletedAt = deletedAt
    }
}