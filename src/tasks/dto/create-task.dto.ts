import { IsInt, IsOptional } from 'class-validator';
import { TaskStatus } from 'src/common/enums/task-status.enum';
import { ScheduleTaskDto } from './schedule-task.dto';
import { PartialType } from '@nestjs/swagger';

export class CreateTaskDto extends PartialType(ScheduleTaskDto) {
    @IsInt()
    project_id: number;

    @IsInt()
    @IsOptional()
    worker_user_id?: number;

    status?: TaskStatus;

    // This info is for now taken from body. But this will be later taken from token
    @IsInt()
    created_by: number;
}
