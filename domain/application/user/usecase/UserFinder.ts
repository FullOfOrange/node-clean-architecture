import {User} from "../../../domain/user/User";

export interface UserFinder {

    findById(id: string): Promise<User>
    findByEmail(email: string): Promise<User>
}

export const UserFinder = Symbol("UserFinder");