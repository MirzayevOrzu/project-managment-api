import { Knex } from 'knex';

export async function seed(knex: Knex): Promise<void> {
    await knex('projects').del();
    await knex('projects').insert([
        {
            // id: 1,
            org_id: 1,
            created_by: 2,
        },
        {
            // id: 2,
            org_id: 1,
            created_by: 2,
        },
        {
            // id: 3,
            org_id: 2,
            created_by: 3,
        },
        {
            // id: 4,
            org_id: 2,
            created_by: 3,
        },
    ]);
}
