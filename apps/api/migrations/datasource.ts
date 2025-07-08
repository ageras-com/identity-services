import { NestFactory } from '@nestjs/core';
import { InfrastructureModule } from '../src/infrastructure/infrastructure.module';
import { DataSource } from 'typeorm';
import { TypedConfigService } from '../src/infrastructure/config/typed-config.service';
import { dataSourceOptions } from '../src/infrastructure/typeorm/typeorm';
import migrations from '../migrations';

export default NestFactory.create(InfrastructureModule)
  .then((app) => app.get(TypedConfigService))
  .then((configService) => {
    const datasourceOptionsConfig = dataSourceOptions(configService);

    return new DataSource({
      ...datasourceOptionsConfig,
      migrations,
    });
  })
  .then((dataSource) => dataSource);
