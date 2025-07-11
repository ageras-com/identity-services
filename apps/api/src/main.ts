import {
  configureSwagger,
  TypedConfigService,
} from '@identity-services/common';
import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    //bufferLogs: true,
  });
  configureSwagger(app);
  app.useLogger(app.get(WINSTON_MODULE_NEST_PROVIDER));

  const configService = app.get(TypedConfigService);
  const logger = app.get<Logger>(WINSTON_MODULE_NEST_PROVIDER);

  await app.listen(configService.server.port || 4001);
  logger.log(
    `🚀 Application is running on: ${await app.getUrl()}`,
    'Bootstrap',
  );
}

void bootstrap();
