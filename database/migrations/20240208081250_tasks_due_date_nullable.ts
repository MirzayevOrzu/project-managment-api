import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
    return knex.schema.alterTable('tasks', (table) => {
        table
            .timestamp('due_date', { precision: 6, useTz: true })
            .nullable()
            .alter();
    });
}

export async function down(knex: Knex): Promise<void> {
    return knex.schema.alterTable('tasks', (table) => {
        table
            .timestamp('due_date', { precision: 6, useTz: true })
            .notNullable()
            .alter();
    });
}
