import { IsEnum, IsInt, IsNotEmpty, IsString } from 'class-validator';
import { UserRole } from 'src/common/enums/user-role.enum';

export class CreateUserDto {
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsEnum([UserRole.DIRECTOR, UserRole.WORKER])
    role: string;

    @IsInt()
    org_id: number;
}
