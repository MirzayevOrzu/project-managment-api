import { Transform } from 'class-transformer';
import { IsInt, IsOptional, Min } from 'class-validator';

export class OffsetPaginationDto {
    @IsOptional()
    @IsInt()
    @Min(0)
    @Transform(({ value }) => parseInt(value))
    offset?: number;

    @IsOptional()
    @IsInt()
    @Min(1)
    @Transform(({ value }) => parseInt(value))
    limit?: number;
}
