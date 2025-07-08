import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { configureSwagger } from './infrastructure/utils/swagger';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { TypedConfigService } from './infrastructure/config/typed-config.service';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
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
