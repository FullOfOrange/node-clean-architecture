import {Model} from "objection";
import {User} from "../../domain/user/User";

export class Users extends Model {
    id!: string
    email!: string
    createdAt!: Date
    updatedAt!: Date
    deletedAt?: Date

    static tableName = 'user'
    static idColumn = "id"

    toUser(): User {
        return new User({
            id: this.id,
            email: this.email,
            createdAt: this.createdAt,
            updatedAt: this.updatedAt,
            deletedAt: this.deletedAt,
        })
    }
}