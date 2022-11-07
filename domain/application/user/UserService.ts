import {UserFinder} from "./usecase/UserFinder";
import {User} from "../../domain/user/User";
import {inject, singleton} from "tsyringe";
import {Connection} from "../../data/configuration";
import {UserRepository} from "../../domain/user/UserRepository";
import {UserAlreadyExistError, UserNotFoundError} from "../../domain/DomainError";
import {UserCreateCommand, UserCreateProcessor} from "./usecase/UserCreateProcessor";

@singleton()
export class UserService implements UserFinder, UserCreateProcessor {

    constructor(
        @inject(Connection) private conn: Connection,
        @inject(UserRepository) private userRepository: UserRepository,
    ) {
    }

    async findById(id: string): Promise<User> {
        return await this.conn.transaction(async trx => {
            const user = await this.userRepository.findById(id, {trx: trx})
            if (user === undefined) throw new UserNotFoundError()
            return user
        });
    }

    async findByEmail(email: string): Promise<User> {
        return await this.conn.transaction(async trx => {
            const user = await this.userRepository.findByEmail(email, {trx: trx})
            if (user === undefined) throw new UserNotFoundError()
            return user
        });
    }

    async process(command: UserCreateCommand): Promise<string> {
        return await this.conn.transaction(async trx => {
            const existUser = await this.userRepository.findByEmail(command.email, {trx: trx})

            if (existUser !== undefined) throw new UserAlreadyExistError()

            const newUser = new User(command.email)
            const user = await this.userRepository.save(newUser, {trx: trx})
            return user.requireId()
        });
    }
}