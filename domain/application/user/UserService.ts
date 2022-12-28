import {UserFinder} from "./usecase/UserFinder";
import {User} from "../../domain/user/User";
import {inject, singleton} from "tsyringe";
import {UserRepository} from "../../domain/user/UserRepository";
import {UserAlreadyExistError, UserNotFoundError} from "../../domain/DomainError";
import {UserCreateCommand, UserCreateProcessor} from "./usecase/UserCreateProcessor";
import {TransactionManager} from "../../../common/transaction/TransactionManager";

@singleton()
export class UserService implements UserFinder, UserCreateProcessor {

    constructor(
        @inject(TransactionManager) private transactionManager: TransactionManager,
        @inject(UserRepository) private userRepository: UserRepository,
    ) {
    }

    async findById(id: string): Promise<User> {
        return await this.transactionManager.init(async () => {
            const user = await this.userRepository.findById(id)
            if (user === undefined) throw new UserNotFoundError()
            return user
        });
    }

    async findByEmail(email: string): Promise<User> {
        return await this.transactionManager.init(async () => {
            const user = await this.userRepository.findByEmail(email)
            if (user === undefined) throw new UserNotFoundError()
            return user
        });
    }

    async process(command: UserCreateCommand): Promise<string> {
        return await this.transactionManager.init(async () => {
            const existUser = await this.userRepository.findByEmail(command.email)

            if (existUser !== undefined) throw new UserAlreadyExistError()

            const newUser = new User({
                email: command.email,
            })
            const user = await this.userRepository.save(newUser)
            return user.requireId()
        })
    }
}