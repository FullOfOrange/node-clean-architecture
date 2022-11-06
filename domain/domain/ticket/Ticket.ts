export class Ticket {

    id?: string = undefined
    name: string
    count: number
    createdAt: Date = new Date()
    updatedAt: Date = new Date()
    deletedAt?: Date = undefined

    constructor(
        name: string,
        count: number,
        id?: string,
        createdAt?: Date,
        updatedAt?: Date,
        deletedAt?: Date,
    ) {
        this.id = id ?? undefined
        this.name = name
        this.count = count
        this.createdAt = createdAt ?? new Date()
        this.updatedAt = updatedAt ?? new Date()
        this.deletedAt = deletedAt
    }
}