import {Transaction} from "../../data/configuration";
import {User} from "./User";

export interface UserRepository {

    findById(id: string, {trx}: { trx: Transaction }): Promise<User | undefined>

    save(user: User, {trx}: { trx: Transaction }): Promise<User>
}

export const UserRepository = Symbol("UserRepository");