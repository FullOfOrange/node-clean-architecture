import {Knex} from "knex";

export const up = (knex: Knex) => {
    return knex.schema
        .createTable('ticket', function (table) {
            table.bigIncrements('id', { primaryKey: true });
            table.string('name', 255).notNullable();
            table.integer('count')
            table.datetime('created_at', { precision: 6 }).notNullable();
            table.datetime('updated_at', { precision: 6 }).notNullable();
            table.datetime('deleted_at', { precision: 6 }).defaultTo(null)
        })
};

export const down = (knex: Knex) => {
    return knex.schema
        .dropTable("ticket");
};

export const config = { transaction: false };