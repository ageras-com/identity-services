import { Module } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleAsyncOptions } from '@nestjs/typeorm';
import { TypedConfigModule } from './config/typed-config.module';
import { TypedConfigService } from './config/typed-config.service';

import { dataSourceOptions } from './typeorm/typeorm';
import { HealthcheckController } from './healthcheck.controller';
import { AppLoggerModule } from './logging/logger.module';

@Module({
  imports: [
    TypedConfigModule,
    AppLoggerModule,
    TypeOrmModule.forRootAsync({
      useFactory: (configService: TypedConfigService) => {
        return dataSourceOptions(configService) as TypeOrmModuleAsyncOptions;
      },
      inject: [TypedConfigService],
    }),
  ],
  controllers: [HealthcheckController],
})
export class InfrastructureModule {}
