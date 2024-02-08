import { OmitType, PartialType } from '@nestjs/swagger';
import { CreateProjectDto } from './create-project.dto';

export class UpdateProjectDto extends PartialType(
    // this fields will not be changed
    OmitType(CreateProjectDto, ['org_id', 'created_by']),
) {}
