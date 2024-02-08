import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    ParseIntPipe,
    Patch,
    Post,
    Query,
} from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { ListProjectsDto } from './dto/list-projects.dto';
import { UpdateProjectDto } from './dto/update-projects.dto';

@Controller('projects')
export class ProjectsController {
    constructor(private readonly projectsService: ProjectsService) {}

    @Post()
    create(@Body() dto: CreateProjectDto) {
        return this.projectsService.create(dto);
    }

    @Get()
    list(
        @Query() dto: ListProjectsDto,
        // This later should be taken from token
        @Query('created_by', ParseIntPipe) created_by: number,
    ) {
        return this.projectsService.list(dto, created_by);
    }

    @Get(':id')
    show(
        @Param('id', ParseIntPipe) id: number,
        @Query('created_by', ParseIntPipe) created_by: number,
    ) {
        return this.projectsService.show(id, created_by);
    }

    @Patch(':id')
    update(
        @Param('id', ParseIntPipe) id: number,
        @Body() dto: UpdateProjectDto,
        @Query('created_by', ParseIntPipe) created_by: number,
    ) {
        return this.projectsService.update(id, dto, created_by);
    }

    @Delete(':id')
    remove(
        @Param('id', ParseIntPipe) id: number,
        @Query('created_by', ParseIntPipe) created_by: number,
    ) {
        return this.projectsService.remove(id, created_by);
    }
}
