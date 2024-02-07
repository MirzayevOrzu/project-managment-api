import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('projects', (table) => {
        table.increments('id');
        table
            .integer('org_id')
            .references('id')
            .inTable('organizations')
            .notNullable();
        table
            .integer('created_by')
            .references('id')
            .inTable('users')
            .notNullable();
    });
}

export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable('projects');
}
