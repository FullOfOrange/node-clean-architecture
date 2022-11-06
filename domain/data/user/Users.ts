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
        return new User(
            this.email,
            this.id,
            this.createdAt,
            this.updatedAt,
            this.deletedAt,
        )
    }
}