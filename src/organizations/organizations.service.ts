import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectKnex, Knex } from 'nestjs-knex';
import { CreateOrganizationDto } from './dto/create-organization.dto';
import { ListOrganizationsDto } from './dto/list-organizations.dto';
import { UpdateOrganizationDto } from './dto/update-organization.dto';

@Injectable()
export class OrganizationsService {
    private readonly logger = new Logger(OrganizationsService.name);

    constructor(@InjectKnex() private knex: Knex) {}

    async create(dto: CreateOrganizationDto) {
        try {
            const [newOrganization] = await this.knex('organizations')
                .insert(dto)
                .returning('*');

            return newOrganization;
        } catch (error) {
            this.logger.error(error);
            throw error;
        }
    }

    async list({ offset = 0, limit = 10 }: ListOrganizationsDto) {
        try {
            const dbQuery = this.knex('organizations');

            const [organizations, total] = await Promise.all([
                dbQuery.clone().offset(offset).limit(limit),
                dbQuery.clone().count(),
            ]);

            return {
                data: organizations,
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

    async show(id: number) {
        try {
            const organization = await this.knex('organizations')
                .where({ id })
                .first();

            if (!organization) {
                throw new NotFoundException('Organization not found!');
            }

            return organization;
        } catch (error) {
            this.logger.error(error);
            throw error;
        }
    }

    async update(id, dto: UpdateOrganizationDto) {
        try {
            const organization = await this.knex('organizations')
                .where({ id })
                .update(dto)
                .returning('*');

            if (!organization) {
                throw new NotFoundException('Organization not found!');
            }

            return organization;
        } catch (error) {
            this.logger.error(error);
            throw error;
        }
    }

    async remove(id: number) {
        try {
            const organization = await this.knex('organizations')
                .where({ id })
                .first();

            if (!organization) {
                throw new NotFoundException('Organization not found!');
            }

            await this.knex('organizations').where({ id }).delete();

            return organization;
        } catch (error) {
            this.logger.error(error);
            throw error;
        }
    }
}
