import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('users', (table) => {
        table.increments('id');
        table.string('name').notNullable();
        table.enum('role', ['admin', 'director', 'staff']).notNullable();
        table
            .timestamp('created_at', { precision: 6, useTz: true })
            .defaultTo(knex.fn.now(6));
    });
}

export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable('users');
}
