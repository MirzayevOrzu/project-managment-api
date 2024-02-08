import {
    BadRequestException,
    Injectable,
    Logger,
    NotFoundException,
} from '@nestjs/common';
import { InjectKnex, Knex } from 'nestjs-knex';
import { CreateTaskDto } from './dto/create-task.dto';
import { ListTasksDto } from './dto/list-tasks.dto';
import { TaskStatus } from 'src/common/enums/task-status.enum';
import { ScheduleTaskDto } from './dto/schedule-task.dto';
import { ListTasksByProjectsDto } from './dto/list-tasks-by-projects.dto';

@Injectable()
export class TasksService {
    private readonly logger = new Logger(TasksService.name);

    constructor(@InjectKnex() private knex: Knex) {}

    async create(dto: CreateTaskDto) {
        try {
            if (dto.worker_user_id) {
                dto.status = TaskStatus.IN_PROCESS;
            }

            const [newTask] = await this.knex('tasks')
                .insert(dto)
                .returning('*');

            return newTask;
        } catch (error) {
            this.logger.error(error);
            throw error;
        }
    }

    async list(
        { offset = 0, limit = 10, ...filter }: ListTasksDto,
        created_by: number,
    ) {
        try {
            const dbQuery = this.knex('tasks').where({
                ...filter,
                created_by,
            });

            const [tasks, total] = await Promise.all([
                dbQuery.clone().offset(offset).limit(limit),
                dbQuery.clone().count(),
            ]);

            return {
                data: tasks,
                pageInfo: {
                    total: +total[0].count,
                    offset,
                    limit,
                },
            };
        } catch (error) {
            this.logger.error(error);
            throw error;
        }
    }

    // List tasks by projects works for both director and worker
    listByProjects(dto: ListTasksByProjectsDto) {
        try {
            const filter = dto.getFilter();

            return this.knex('projects')
                .leftJoin('tasks', 'projects.id', 'tasks.project_id')
                .leftJoin('users', 'tasks.worker_user_id', 'users.id')
                .where(filter)
                .select(
                    'projects.*',
                    this.knex.raw(
                        "json_agg(json_build_object('id', tasks.id, 'created_by', tasks.created_by, 'due_date', tasks.due_date, 'status', tasks.status, 'done_at', tasks.done_at, 'worker', json_build_object('id', users.id, 'name', users.name))) as tasks",
                    ),
                )
                .groupBy('projects.id');
        } catch (error) {
            this.logger.error(error);
            throw error;
        }
    }

    async listByStatuses(worker_user_id: number) {
        try {
            const groupedByStatuses = await this.knex('tasks')
                .select(
                    this.knex.raw(
                        "CASE WHEN status = 'done' THEN 'done' WHEN status = 'in_process' THEN 'in_process' WHEN status = 'created' THEN 'created' ELSE 'other' END AS status",
                    ),
                    this.knex.raw(
                        "json_agg(json_build_object('id', tasks.id, 'created_by', tasks.created_by, 'due_date', tasks.due_date, 'status', tasks.status, 'done_at', tasks.done_at)) as tasks",
                    ),
                )
                .where('tasks.worker_user_id', '=', worker_user_id)
                .groupBy('status');

            return groupedByStatuses;
        } catch (error) {
            this.logger.error(error);
            throw error;
        }
    }

    async attach(id: number, created_by: number, worker_user_id: number) {
        try {
            const task = await this.knex('tasks')
                .where({ id, created_by })
                .first();

            if (!task) {
                throw new NotFoundException('Task not found!');
            }

            if (task.worker_user_id) {
                throw new BadRequestException('Task already attached!');
            }

            await this.knex('tasks')
                .where({ id })
                .update({ worker_user_id, status: TaskStatus.IN_PROCESS });

            return true;
        } catch (error) {
            this.logger.error(error);
            throw error;
        }
    }

    async schedule(id: number, created_by: number, dto: ScheduleTaskDto) {
        try {
            const task = await this.knex('tasks')
                .where({ id, created_by })
                .first();

            if (!task) {
                throw new NotFoundException('Task not found!');
            }

            await this.knex('tasks').where({ id }).update(dto);

            return true;
        } catch (error) {
            this.logger.error(error);
            throw error;
        }
    }

    async complete(id: number, worker_user_id) {
        try {
            const task = await this.knex('tasks')
                .where({ id, worker_user_id })
                .andWhere('status', '!=', TaskStatus.DONE)
                .first();

            if (!task) {
                throw new NotFoundException('Task not found!');
            }

            await this.knex('tasks')
                .where({ id })
                .update({ status: TaskStatus.DONE, done_at: new Date() });

            return true;
        } catch (error) {
            this.logger.error(error);
            throw error;
        }
    }

    async remove(id: number, created_by: number) {
        try {
            const task = await this.knex('tasks')
                .where({ id, created_by })
                .first();

            if (!task) {
                throw new NotFoundException('Task not found!');
            }

            await this.knex('tasks').where({ id }).delete();

            return task;
        } catch (error) {
            this.logger.error(error);
            throw error;
        }
    }
}
