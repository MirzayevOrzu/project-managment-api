import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { Knex } from 'knex';
import { InjectKnex } from 'nestjs-knex';
import { CreateProjectDto } from './dto/create-project.dto';
import { ListProjectsDto } from './dto/list-projects.dto';
import { UpdateProjectDto } from './dto/update-projects.dto';

@Injectable()
export class ProjectsService {
    private readonly logger = new Logger(ProjectsService.name);

    constructor(@InjectKnex() private knex: Knex) {}

    async create(dto: CreateProjectDto) {
        try {
            const [newProject] = await this.knex('projects')
                .insert(dto)
                .returning('*');

            return newProject;
        } catch (error) {
            this.logger.error(error);
            throw error;
        }
    }

    async list(
        { offset = 0, limit = 10 }: ListProjectsDto,
        created_by: number,
    ) {
        try {
            const dbQuery = this.knex('projects').where({ created_by });

            const [projects, total] = await Promise.all([
                dbQuery.clone().offset(offset).limit(limit),
                dbQuery.clone().count(),
            ]);

            return {
                data: projects,
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

    async show(id: number, created_by: number) {
        try {
            const project = await this.knex('projects')
                .where({ id, created_by })
                .first();

            if (!project) {
                throw new NotFoundException('Project not found!');
            }

            return project;
        } catch (error) {
            this.logger.error(error);
            throw error;
        }
    }

    async update(id, dto: UpdateProjectDto, created_by: number) {
        try {
            const project = await this.knex('projects')
                .where({ id, created_by })
                .update(dto)
                .returning('*');

            if (!project) {
                throw new NotFoundException('Project not found!');
            }

            return project;
        } catch (error) {
            this.logger.error(error);
            throw error;
        }
    }

    async remove(id: number, created_by: number) {
        try {
            const project = await this.knex('projects')
                .where({ id, created_by })
                .first();

            if (!project) {
                throw new NotFoundException('Project not found!');
            }

            await this.knex('projects').where({ id }).delete();

            return project;
        } catch (error) {
            this.logger.error(error);
            throw error;
        }
    }
}
