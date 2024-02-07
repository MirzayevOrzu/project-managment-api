import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CoreModules } from './common/modules/core.module';
import { OrganizationsModule } from './organizations/organizations.module';
import { UsersModule } from './users/users.module';

@Module({
    imports: [CoreModules, OrganizationsModule, UsersModule],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
