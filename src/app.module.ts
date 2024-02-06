import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CoreModules } from './common/modules/core.module';
import { OrganizationsModule } from './organizations/organizations.module';

@Module({
    imports: [CoreModules, OrganizationsModule],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
