import { Knex } from 'knex';

export async function seed(knex: Knex): Promise<void> {
    await knex('tasks').del();
    await knex('tasks').insert([
        // organization 1
        ...[
            // worker id 4
            ...[
                {
                    // id: 1,
                    created_by: 2,
                    project_id: 1,
                    due_date: new Date(Date.now() + 24 * 60 * 60 * 1000),
                    worker_user_id: 4,
                    status: 'created',
                    done_at: null,
                },
                {
                    // id: 2,
                    created_by: 2,
                    project_id: 1,
                    due_date: new Date(Date.now() + 48 * 60 * 60 * 1000),
                    worker_user_id: 4,
                    status: 'in_process',
                    done_at: null,
                },
                {
                    // id: 3,
                    created_by: 2,
                    project_id: 2,
                    due_date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
                    worker_user_id: 4,
                    status: 'done',
                    done_at: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
                },
                {
                    // id: 4,
                    created_by: 2,
                    project_id: 2,
                    due_date: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
                    worker_user_id: 4,
                    status: 'created',
                    done_at: null,
                },
            ],
            // worker id 5
            ...[
                {
                    // id: 5,
                    created_by: 2,
                    project_id: 1,
                    due_date: new Date(Date.now() + 24 * 60 * 60 * 1000),
                    worker_user_id: 5,
                    status: 'created',
                    done_at: null,
                },
                {
                    // id: 6,
                    created_by: 2,
                    project_id: 2,
                    due_date: new Date(Date.now() - 24 * 60 * 60 * 1000),
                    worker_user_id: 5,
                    status: 'done',
                    done_at: new Date(Date.now() - 2 * 60 * 60 * 1000),
                },
            ],
        ],
    ]);
}
