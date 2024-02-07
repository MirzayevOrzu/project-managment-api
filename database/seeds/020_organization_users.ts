import { Knex } from 'knex';

export async function seed(knex: Knex): Promise<void> {
    await knex('organization_users').del();
    await knex('organization_users').insert([
        {
            id: 1,
            org_id: 1,
            user_id: 2,
        },
        {
            id: 2,
            org_id: 2,
            user_id: 3,
        },
        {
            id: 3,
            org_id: 1,
            user_id: 4,
        },
        {
            id: 4,
            org_id: 1,
            user_id: 5,
        },
        {
            id: 5,
            org_id: 2,
            user_id: 6,
        },
        {
            id: 6,
            org_id: 2,
            user_id: 7,
        },
    ]);
}
