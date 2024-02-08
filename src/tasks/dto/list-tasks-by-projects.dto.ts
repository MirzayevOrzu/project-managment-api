import { Transform, Exclude } from 'class-transformer';
import { IsInt, IsOptional } from 'class-validator';

export class ListTasksByProjectsDto {
    @Exclude({ toPlainOnly: true })
    @IsInt()
    @IsOptional()
    @Transform(({ value }) => parseInt(value))
    worker_user_id?: number;

    @Exclude({ toPlainOnly: true })
    @IsInt()
    @IsOptional()
    @Transform(({ value }) => parseInt(value))
    created_by?: number;

    getFilter() {
        const filter = {};

        this.worker_user_id
            ? (filter['tasks.worker_user_id'] = this.worker_user_id)
            : null;

        this.created_by
            ? (filter['projects.created_by'] = this.created_by)
            : null;

        return filter;
    }
}
