import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('organization_users', (table) => {
        table.increments('id');
        table.integer('org_id').references('id').inTable('organizations');
        // It is said that this table should be created. But this table would link organizations and users
        // in a many-to-many relationship which I did not see the need for. Anyway, I created table but
        // applied unique constraint to user_id column to turn relationship again to one-to-many manner
        table.integer('user_id').references('id').inTable('users').unique();
    });
}

export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable('organization_users');
}
