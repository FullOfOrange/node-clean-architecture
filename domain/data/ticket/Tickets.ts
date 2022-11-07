import {JSONSchema, Model} from "objection";
import {Ticket} from "../../domain/ticket/Ticket";

export class Tickets extends Model {

    id!: string
    name!: string
    count: number
    createdBy: string
    createdAt: Date
    updatedAt: Date
    deletedAt?: Date

    static tableName = 'ticket'
    static idColumn = "id"

    toTicket(): Ticket {
        return new Ticket({
            id: this.id,
            name: this.name,
            count: this.count,
            createdBy: this.createdBy,
            createdAt: this.createdAt,
            updatedAt: this.updatedAt,
            deletedAt: this.deletedAt,
        })
    }
}

