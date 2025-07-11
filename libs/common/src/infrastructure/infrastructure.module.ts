import { Module } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleAsyncOptions } from '@nestjs/typeorm';

import { TypedConfigModule } from './config/typed-config.module';
import { TypedConfigService } from './config/typed-config.service';
import { AppLoggerModule } from './logging/logger.module';
import { dataSourceOptions } from './typeorm/typeorm';

@Module({
  imports: [
    TypedConfigModule,
    AppLoggerModule,
    TypeOrmModule.forRootAsync({
      inject: [TypedConfigService],
      useFactory: (configService: TypedConfigService) => {
        return dataSourceOptions(configService) as TypeOrmModuleAsyncOptions;
      },
    }),
  ],
})
export class InfrastructureModule {}
