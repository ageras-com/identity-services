import { Module } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleAsyncOptions } from '@nestjs/typeorm';
import { TypedConfigModule } from './config/typed-config.module';
import { TypedConfigService } from './config/typed-config.service';

import { dataSourceOptions } from './typeorm/typeorm';
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
})
export class InfrastructureModule {}
