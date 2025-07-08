import { Module } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleAsyncOptions } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { TypedConfigModule } from './config/typed-config.module';
import { TypedConfigService } from './config/typed-config.service';

import { dataSourceOptions, envSchema } from './typeorm/typeorm';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: envSchema,
    }),
    TypedConfigModule,
    TypeOrmModule.forRootAsync({
      useFactory: (configService: TypedConfigService) => {
        return dataSourceOptions(configService) as TypeOrmModuleAsyncOptions;
      },
      inject: [TypedConfigService],
    }),
  ],
})
export class infrastructureModule {}
