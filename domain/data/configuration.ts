import * as Knex from 'knex';
import {knexSnakeCaseMappers} from "objection";
import {container} from "tsyringe";
import {TicketRepository} from "../domain/ticket/TicketRepository";
import {KnexTicketRepository} from "./ticket/KnexTicketRepository";
import {UserRepository} from "../domain/user/UserRepository";
import {KnexUserRepository} from "./user/KnexUserRepository";
import {TransactionManager} from "../../common/transaction/TransactionManager";
import {KnexTransactionManager} from "./KnexTransactionManager";

export const connection = Knex.knex({
    client: 'mysql2',
    version: '8.0.26',
    debug: true,
    connection: {
        host: '127.0.0.1',
        port: 13306,
        user: 'root',
        password: 'password',
        database: 'reservation'
    },
    pool: {
        min: 2,
        max: 5
    },
    ...knexSnakeCaseMappers()
});

export const dataConfiguration = () => {
    container.registerSingleton(TicketRepository, KnexTicketRepository);
    container.registerSingleton(UserRepository, KnexUserRepository);
    container.registerSingleton(TransactionManager, KnexTransactionManager)
}