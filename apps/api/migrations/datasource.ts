import { NestFactory } from '@nestjs/core';
import { InfrastructureModule } from '../src/infrastructure/infrastructure.module';
import { DataSource } from 'typeorm';

export default NestFactory.create(InfrastructureModule)
  .then((app) => app.get(DataSource))
  .then((dataSource) => Promise.all([dataSource, dataSource.destroy()]))
  .then(([dataSource]) => dataSource);
