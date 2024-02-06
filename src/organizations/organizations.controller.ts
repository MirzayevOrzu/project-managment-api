import {
    Controller,
    Body,
    Param,
    Query,
    Post,
    Get,
    Patch,
    Delete,
    ParseIntPipe,
} from '@nestjs/common';
import { OrganizationsService } from './organizations.service';
import { CreateOrganizationDto } from './dto/create-organization.dto';
import { ListOrganizationsDto } from './dto/list-organizations.dto';
import { UpdateOrganizationDto } from './dto/update-organization.dto';

@Controller('organizations')
export class OrganizationsController {
    constructor(private readonly organizationsService: OrganizationsService) {}

    @Post()
    create(@Body() dto: CreateOrganizationDto) {
        return this.organizationsService.create(dto);
    }

    @Get()
    list(@Query() dto: ListOrganizationsDto) {
        return this.organizationsService.list(dto);
    }

    @Get(':id')
    show(@Param('id', ParseIntPipe) id: number) {
        return this.organizationsService.show(id);
    }

    @Patch(':id')
    update(
        @Param('id', ParseIntPipe) id: number,
        @Body() dto: UpdateOrganizationDto,
    ) {
        return this.organizationsService.update(id, dto);
    }

    @Delete(':id')
    remove(@Param('id', ParseIntPipe) id: number) {
        return this.organizationsService.remove(id);
    }
}
