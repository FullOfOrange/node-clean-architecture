import knex from 'knex';

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
    }
});