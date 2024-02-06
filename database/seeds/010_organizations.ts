import { Knex } from 'knex';

export async function seed(knex: Knex): Promise<void> {
    await knex('organizations').del();
    await knex('organizations').insert([
        {
            // id: 1,
            name: 'ЎзбекТехПром',
        },
        {
            // id: 2,
            name: 'СамарқандСервис',
        },
        {
            // id: 3,
            name: 'НавоиТрансЛогистика',
        },
    ]);
}
