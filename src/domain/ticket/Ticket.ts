import {BigIntType, Entity, PrimaryKey, Property} from "@mikro-orm/core";

@Entity()
export class Ticket {

    @PrimaryKey({type: BigIntType})
    id: String

    @Property()
    name: string

    @Property()
    limit: number

    @Property()
    createdAt: Date = new Date()

    @Property()
    updatedAt: Date = new Date()

    @Property({nullable: true})
    deletedAt?: Date = undefined

    constructor(name: string, limit: number) {
        this.name = name
        this.limit = limit
    }
}