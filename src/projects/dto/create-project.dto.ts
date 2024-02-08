import { IsInt } from 'class-validator';

export class CreateProjectDto {
    @IsInt()
    org_id: number;

    // This info is for now taken from body. But this will be later taken from token
    @IsInt()
    created_by: number;
}
