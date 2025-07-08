import * as Joi from 'joi';
import { TypedConfigService } from '../config/typed-config.service';
import { DataSourceOptions } from 'typeorm';
import entities from './entities';

export const envSchema = Joi.object({
  DB_HOST: Joi.string().default('localhost'),
  DB_NAME: Joi.string().default('identity-services'),
  DB_PASSWORD: Joi.string().default('postgres'),
  DB_PORT: Joi.number().default(3302),
  DB_USERNAME: Joi.string().default('postgres'),
  LOG_LEVEL: Joi.string().optional().default('info'),
  NODE_ENV: Joi.string()
    .valid('development', 'production', 'test')
    .default('development'),
  PORT: Joi.number().optional().default(4001),
});
export const dataSourceOptions = (
  configService: TypedConfigService,
): DataSourceOptions => ({
  type: 'postgres',
  host: configService.database.host,
  port: +configService.database.port,
  username: configService.database.username,
  password: configService.database.password,
  database: configService.database.name,
  synchronize: false,
  logging: true,
  migrationsRun: false,
  entities,
});
