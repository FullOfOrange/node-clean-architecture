import 'reflect-metadata'

import {beforeAll, describe, expect, test} from "@jest/globals";
import {Tickets} from "../../../../domain/data/Tickets";
import {MySqlContainer} from "testcontainers";
import Knex from "knex";
import {knexSnakeCaseMappers, Model} from "objection";
import {TicketService} from "../../../../domain/application/ticket/TicketService";
import {TicketFinder} from "../../../../domain/application/ticket/TicketFinder";
import {KnexTicketRepository} from "../../../../domain/data/KnexTicketRepository";
import {Ticket} from "../../../../domain/domain/ticket/Ticket";

describe('TicketService test', () => {

    let ticketService: TicketFinder
    let testTicketInstance: Ticket

    test('insert and find', async () => {
        const result = await ticketService.findById(testTicketInstance.id!!)
        expect(result).toStrictEqual(testTicketInstance)
    });

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

        const ticketRepository = new KnexTicketRepository()
        ticketService = new TicketService(knex, ticketRepository)

        // Add test data sets
        const insertResult = await Tickets.query().insertAndFetch({
            name: 'test',
            count: 1,
            createdAt: new Date(),
            updatedAt: new Date(),
        })
        testTicketInstance = insertResult.toTicket()

    }, 100000)
});