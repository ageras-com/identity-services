import { TypedConfigService } from '../config/typed-config.service';
import { DataSourceOptions } from 'typeorm';
import entities from './entities';

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
  logging: configService.server.environment === 'development' ? true : false,
  migrationsRun: false,
  entities,
});
