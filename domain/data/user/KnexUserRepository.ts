import {injectable} from "tsyringe";
import {Transaction} from "../configuration";
import {UserRepository} from "../../domain/user/UserRepository";
import {User} from "../../domain/user/User";
import {Users} from "./Users";

@injectable()
export class KnexUserRepository implements UserRepository {

    async findById(id: string, {trx}: { trx: Transaction }): Promise<User | undefined> {
        const result = await Users
            .query(trx)
            .select('*')
            .where('id', id)
            .first()

        if (result === undefined) {
            return result
        } else {
            return result?.toUser()
        }
    }

    async findByEmail(email: string, {trx}: { trx: Transaction }): Promise<User | undefined> {
        const result = await Users
            .query(trx)
            .select('*')
            .where('email', email)
            .first()

        if (result === undefined) {
            return result
        } else {
            return result?.toUser()
        }
    }

    async save(user: User, {trx}: { trx: Transaction }): Promise<User> {
        const object: Partial<Users> = {
            id: user.id,
            email: user.email,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt,
            deletedAt: user.deletedAt,
        }
        const result = await Users.query(trx).upsertGraphAndFetch(object)
        return result.toUser()
    }


}