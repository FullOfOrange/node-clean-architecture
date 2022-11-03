import {JSONSchema, Model} from "objection";
import {Ticket} from "../domain/ticket/Ticket";

export class Tickets extends Model {

    id!: string
    name!: string
    count: number
    createdAt: Date
    updatedAt: Date
    deletedAt?: Date

    static tableName = 'ticket'
    static idColumn = "id"

    toTicket(): Ticket {
        return new Ticket(
            this.id,
            this.name,
            this.count,
            this.createdAt,
            this.updatedAt,
            this.deletedAt,
        )
    }
}

