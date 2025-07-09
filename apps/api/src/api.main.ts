import { NestFactory } from '@nestjs/core';
import { ApiModule } from './api.module';
import { configureSwagger } from './infrastructure/utils/swagger';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { TypedConfigService } from './infrastructure/config/typed-config.service';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(ApiModule, {
    //bufferLogs: true,
  });
  configureSwagger(app);
  app.useLogger(app.get(WINSTON_MODULE_NEST_PROVIDER));

  const configService = app.get(TypedConfigService);
  const logger = app.get<Logger>(WINSTON_MODULE_NEST_PROVIDER);

  await app.listen(configService.api.port);
  logger.log(
    `🚀 Application is running on: ${await app.getUrl()}`,
    'Bootstrap',
  );
}

void bootstrap();
