import { Transform } from 'class-transformer';
import { IsEnum, IsInt, IsOptional } from 'class-validator';
import { OffsetPaginationDto } from 'src/common/dto/offset-pagination.dto';
import { TaskStatus } from 'src/common/enums/task-status.enum';

export class ListTasksDto extends OffsetPaginationDto {
    @IsInt()
    @Transform(({ value }) => parseInt(value))
    @IsOptional()
    project_id?: number;

    @IsInt()
    @Transform(({ value }) => parseInt(value))
    @IsOptional()
    worker_user_id?: number;

    @IsEnum(TaskStatus)
    @IsOptional()
    status?: TaskStatus;
}
