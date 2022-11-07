export interface UserCreateProcessor {

    process(command: UserCreateCommand): Promise<string>
}

export type UserCreateCommand = {
    email: string,
}

export const UserCreateProcessor = Symbol("UserCreateProcessor")