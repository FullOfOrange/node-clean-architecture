import knex from 'knex';
import {knexSnakeCaseMappers} from "objection";
import {container} from "tsyringe";
import {TicketRepository} from "../domain/ticket/TicketRepository";
import {KnexTicketRepository} from "./KnexTicketRepository";

export const knexConnection = knex({
    client: 'mysql',
    version: '8.0.26',
    debug: true,
    connection: {
        host : '127.0.0.1',
        port : 13306,
        user : 'root',
        password : 'password',
        database : 'reservation'
    },
    ...knexSnakeCaseMappers()
});

export const dataConfiguration = () => {
    container.register(TicketRepository, {useClass: KnexTicketRepository});
}