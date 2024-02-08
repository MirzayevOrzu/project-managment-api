import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    ParseIntPipe,
    Post,
    Query,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { ListTasksDto } from './dto/list-tasks.dto';
import { ScheduleTaskDto } from './dto/schedule-task.dto';
import { ListTasksByProjectsDto } from './dto/list-tasks-by-projects.dto';

@Controller('tasks')
export class TasksController {
    constructor(private readonly tasksService: TasksService) {}

    @Post()
    create(@Body() dto: CreateTaskDto) {
        return this.tasksService.create(dto);
    }

    @Get()
    list(
        @Query() dto: ListTasksDto,
        // This later should be taken from token
        @Query('created_by', ParseIntPipe) created_by: number,
    ) {
        return this.tasksService.list(dto, created_by);
    }

    @Get('by-projects')
    listByProjects(@Query() dto: ListTasksByProjectsDto) {
        return this.tasksService.listByProjects(dto);
    }

    @Get('by-statuses')
    listByStatuses(
        @Query('worker_user_id', ParseIntPipe) worker_user_id: number,
    ) {
        return this.tasksService.listByStatuses(worker_user_id);
    }

    @Post(':id/attach/:worker_user_id')
    attach(
        @Param('id', ParseIntPipe) id: number,
        @Query('created_by', ParseIntPipe) created_by: number,
        @Param('worker_user_id', ParseIntPipe) worker_user_id: number,
    ) {
        return this.tasksService.attach(id, created_by, worker_user_id);
    }

    @Post(':id/schedule')
    schedule(
        @Param('id', ParseIntPipe) id: number,
        @Query('created_by', ParseIntPipe) created_by: number,
        @Body() dto: ScheduleTaskDto,
    ) {
        return this.tasksService.schedule(id, created_by, dto);
    }

    @Post(':id/complete')
    complete(
        @Param('id', ParseIntPipe) id: number,
        @Query('worker_user_id', ParseIntPipe) worker_user_id: number,
    ) {
        return this.tasksService.complete(id, worker_user_id);
    }

    @Delete(':id')
    remove(
        @Param('id', ParseIntPipe) id: number,
        @Query('created_by', ParseIntPipe) created_by: number,
    ) {
        return this.tasksService.remove(id, created_by);
    }
}
