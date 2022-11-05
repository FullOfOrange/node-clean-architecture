import {describe, expect, test, beforeAll} from '@jest/globals';
import {Tickets} from "../../../domain/data/Tickets";
import {MySqlContainer} from "testcontainers";
import Knex from "knex";
import {Model, knexSnakeCaseMappers} from "objection";

describe('Tickets moddel integration test', () => {

    test('insert and find', async () => {
        const ticket = await Tickets.query().insertAndFetch({
            name: 'test',
            count: 1,
            createdAt: new Date(),
            updatedAt: new Date(),
        })
        const result = await Tickets.query().select('*').where('id', ticket.id).first()

        expect(result).toStrictEqual(ticket)
    });

    test('upsert and find', async () => {
        const ticket = await Tickets.query().upsertGraphAndFetch({
            name: 'test',
            count: 1,
            createdAt: new Date(),
            updatedAt: new Date(),
        })
        const result = await Tickets.query().select('*').where('id', ticket.id).first()

        expect(result).toStrictEqual(ticket)
    })

    beforeAll(async () => {
        const container = await new MySqlContainer("mysql:8.0.26")
            .withDatabase("reservation")
            .start()

        const knex = Knex({
            client: 'mysql2',
            connection: {
                host: container.getHost(),
                port: container.getPort(),
                user: 'root',
                password: container.getRootPassword(),
                database: 'reservation'
            },
            ...knexSnakeCaseMappers()
        })
        Model.knex(knex)
        await knex.migrate.latest()
    }, 100000)
});