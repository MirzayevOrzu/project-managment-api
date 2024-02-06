import { Knex } from 'knex';

export async function seed(knex: Knex): Promise<void> {
    await knex('users').del();
    await knex('users').insert([
        {
            // commenting ids allows them to be incremented naturally
            // and helps to write seeds where user ids' are referenced
            // id: 1,
            name: 'Админ',
            role: 'admin',
        },
        {
            // id: 2,
            name: 'Ахмед Малик',
            role: 'director',
        },
        {
            // id: 3,
            name: 'Юсуф Кхан',
            role: 'director',
        },
        {
            // id: 4,
            name: 'Леила Абиди',
            role: 'worker',
        },
        {
            // id: 5,
            name: 'Али Ахмед',
            role: 'worker',
        },
        {
            // id: 6,
            name: 'Амина Малик',
            role: 'worker',
        },
        {
            // id: 7,
            name: 'Омар Салех',
            role: 'worker',
        },
    ]);
}
