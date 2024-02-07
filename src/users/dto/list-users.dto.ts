import { Transform } from 'class-transformer';
import { IsEnum, IsInt, IsOptional } from 'class-validator';
import { OffsetPaginationDto } from 'src/common/dto/offset-pagination.dto';
import { UserRole } from 'src/common/enums/user-role.enum';

export class ListUsersDto extends OffsetPaginationDto {
    @IsInt()
    @Transform(({ value }) => parseInt(value))
    @IsOptional()
    org_id?: number;

    @IsEnum(UserRole)
    @IsOptional()
    role?: UserRole;
}
