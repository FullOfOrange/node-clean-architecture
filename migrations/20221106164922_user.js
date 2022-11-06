/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = (knex) => {
    return knex.schema
        .createTable('user', function (table) {
            table.bigIncrements('id', { primaryKey: true });
            table.string('email', 255).notNullable();
            table.datetime('created_at', { precision: 6 }).notNullable();
            table.datetime('updated_at', { precision: 6 }).notNullable();
            table.datetime('deleted_at', { precision: 6 }).defaultTo(null)
        })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = (knex) => {
    return knex.schema
        .dropTable("user");
};

