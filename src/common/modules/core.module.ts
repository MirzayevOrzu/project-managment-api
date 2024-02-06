import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { KnexModule } from 'nestjs-knex';
import configuration from '../config';
import { KnexConfigService } from '../config/knex.config';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            load: [configuration],
        }),
        KnexModule.forRootAsync({
            useClass: KnexConfigService,
        }),
    ],
})
export class CoreModules {}
