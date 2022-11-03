import {JSONSchema, Model} from "objection";

export class Tickets extends Model {

    id!: string
    name!: string
    count: number
    createdAt: Date
    updatedAt: Date
    deletedAt?: Date

    static tableName = 'ticket'
    static idColumn = "id"
}