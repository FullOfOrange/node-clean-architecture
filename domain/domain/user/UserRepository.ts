import {User} from "./User";

export interface UserRepository {

    findById(id: string): Promise<User | undefined>

    findByEmail(email: string): Promise<User | undefined>

    save(user: User): Promise<User>
}

export const UserRepository = Symbol("UserRepository");