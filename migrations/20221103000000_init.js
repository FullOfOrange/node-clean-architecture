exports.up = (knex) => {
    return knex.schema
        .createTable('ticket', function (table) {
            table.bigIncrements('id', { primaryKey: true });
            table.string('name', 255).notNullable();
            table.integer('count')
            table.bigint('createdBy')
            table.datetime('created_at', { precision: 6 }).notNullable();
            table.datetime('updated_at', { precision: 6 }).notNullable();
            table.datetime('deleted_at', { precision: 6 }).defaultTo(null)
        })
};

exports.down = (knex) => {
    return knex.schema
        .dropTable("ticket");
};