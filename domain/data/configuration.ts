import knex from 'knex';
import {knexSnakeCaseMappers} from "objection";

export const connection = knex({
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