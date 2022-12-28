import {inject, injectable} from "tsyringe";
import {UserRepository} from "../../domain/user/UserRepository";
import {User} from "../../domain/user/User";
import {Users} from "./Users";
import {TransactionManager} from "../../../common/transaction/TransactionManager";

@injectable()
export class KnexUserRepository implements UserRepository {

    constructor(
        @inject(TransactionManager) private transactionManager: TransactionManager
    ) {
    }

    async findById(id: string): Promise<User | undefined> {
        const trx = this.transactionManager.getTransaction()

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

    async findByEmail(email: string): Promise<User | undefined> {
        const trx = this.transactionManager.getTransaction()

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

    async save(user: User): Promise<User> {
        const trx = this.transactionManager.getTransaction()

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