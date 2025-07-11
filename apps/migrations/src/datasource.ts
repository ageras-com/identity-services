import {
  dataSourceOptions,
  InfrastructureModule,
  TypedConfigService,
} from '@identity-services/common';
import { NestFactory } from '@nestjs/core';
import { DataSource } from 'typeorm';

import migrations from './files';

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
