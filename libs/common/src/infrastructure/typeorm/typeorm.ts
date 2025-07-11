import { DataSourceOptions } from 'typeorm';

import { TypedConfigService } from '../config/typed-config.service';
import entities from './entities';

export const dataSourceOptions = (
  configService: TypedConfigService,
): DataSourceOptions => ({
  database: configService.database.name,
  entities,
  host: configService.database.host,
  logging: configService.server.environment === 'development' ? true : false,
  migrationsRun: false,
  password: configService.database.password,
  port: +configService.database.port,
  synchronize: false,
  type: 'postgres',
  username: configService.database.username,
});
