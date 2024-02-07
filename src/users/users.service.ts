import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectKnex, Knex } from 'nestjs-knex';
import { CreateUserDto } from './dto/create-user.dto';
import { ListUsersDto } from './dto/list-users.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export default class UsersService {
    private readonly logger = new Logger(UsersService.name);

    constructor(@InjectKnex() private knex: Knex) {}

    async create(dto: CreateUserDto) {
        const trx = await this.knex.transaction();

        try {
            const { org_id, ...userInfo } = dto;

            const [user] = await trx('users').insert(userInfo).returning('*');

            await trx('organization_users').insert({
                org_id,
                user_id: user.id,
            });

            await trx.commit();
        } catch (error) {
            this.logger.error(error);
            await trx.rollback();
            throw error;
        }
    }

    async list({ offset = 0, limit = 20, org_id, role }: ListUsersDto) {
        try {
            const filter: Record<string, any> = {};

            if (org_id) {
                filter['organization_users.org_id'] = org_id;
            }

            if (role) {
                filter['users.role'] = role;
            }

            const dbQuery = this.knex('users')
                .select('users.*', 'organization_users.org_id')
                .join(
                    'organization_users',
                    'organization_users.user_id',
                    'users.id',
                )
                .where(filter)
                .groupBy('users.id', 'organization_users.org_id');

            const [users, total] = await Promise.all([
                dbQuery.clone().offset(offset).limit(limit),
                dbQuery.clone().count(),
            ]);

            return {
                data: users,
                pageInfo: {
                    total: +total[0]?.count || 0,
                    offset,
                    limit,
                },
            };
        } catch (error) {
            this.logger.error(error);
            throw error;
        }
    }

    async show(id: number) {
        try {
            const user = await this.knex('users')
                .leftJoin(
                    'organization_users',
                    'organization_users.user_id',
                    'users.id',
                )
                .leftJoin(
                    'organizations',
                    'organization_users.org_id',
                    'organizations.id',
                )
                .where('users.id', '=', id)
                .select(
                    'users.*',
                    this.knex.raw(
                        "json_build_object('id', organizations.id, 'name', organizations.name) as organization",
                    ),
                )
                .first();

            if (!user) {
                throw new NotFoundException('User not found!');
            }

            return user;
        } catch (error) {
            this.logger.error(error);
            throw error;
        }
    }

    async update(id: number, dto: UpdateUserDto) {
        try {
            const user = await this.knex('users')
                .where({ id })
                .update(dto)
                .returning('*');

            if (!user) {
                throw new NotFoundException('User not found!');
            }

            return user;
        } catch (error) {
            this.logger.error(error);
            throw error;
        }
    }

    async remove(id: number) {
        try {
            const user = await this.knex('users').where({ id }).first();

            if (!user) {
                throw new NotFoundException('User not found!');
            }

            await this.knex('users').where({ id }).delete();

            return user;
        } catch (error) {
            this.logger.error(error);
            throw error;
        }
    }
}
