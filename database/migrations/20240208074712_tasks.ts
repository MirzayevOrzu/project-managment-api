import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('tasks', (table) => {
        table.increments('id');
        table
            .integer('created_by')
            .references('id')
            .inTable('users')
            .notNullable();
        table
            .timestamp('created_at', { precision: 6, useTz: true })
            .defaultTo(knex.fn.now(6));
        table
            .integer('project_id')
            .references('id')
            .inTable('projects')
            .notNullable();
        table
            .timestamp('due_date', { precision: 6, useTz: true })
            .notNullable();
        table.integer('worker_user_id').references('id').inTable('users');
        table
            .enum('status', ['created', 'in_process', 'done'])
            .defaultTo('created');
        table.timestamp('done_at', { precision: 6, useTz: true });
    });
}

export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable('tasks');
}
