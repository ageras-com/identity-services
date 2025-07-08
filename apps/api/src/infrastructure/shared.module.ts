import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from '../user/user.module';
import { dataSourceOptions } from '../infrastructure/config/typeorm/typeorm';
import * as Joi from 'joi';
import { ConfigModule } from '@nestjs/config';

export const envSchema = Joi.object({
  DB_HOST: Joi.string().default('localhost'),
  DB_NAME: Joi.string().default('nestjs-golden-path'),
  DB_PASSWORD: Joi.string().default('postgres'),
  DB_PORT: Joi.number().default(5432),
  DB_USERNAME: Joi.string().default('postgres'),
  LOG_LEVEL: Joi.string().optional().default('info'),
  NODE_ENV: Joi.string()
    .valid('development', 'production', 'test')
    .default('development'),
  PORT: Joi.number().optional().default(4001),
});

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: envSchema,
    }),
    TypeOrmModule.forRoot(dataSourceOptions),
    UserModule,
  ],
})
export class SharedModule {}
