import { NestFactory } from '@nestjs/core';
import { WorkerModule } from './worker.module';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { TypedConfigService } from './infrastructure/config/typed-config.service';
import { Logger } from '@nestjs/common';
import { MicroserviceOptions } from '@nestjs/microservices';
import { SqsTransporterServer } from './infrastructure/transporters/sqs.server';

async function bootstrap() {
  // Worker is started as nest application and not a microservice because we still the
  // worker to provide a healtcheck endpoint
  const app = await NestFactory.create(WorkerModule, {
    bufferLogs: true,
  });
  const configService = app.get(TypedConfigService);
  const logger = app.get<Logger>(WINSTON_MODULE_NEST_PROVIDER);

  app.useLogger(logger);
  app.connectMicroservice<MicroserviceOptions>({
    strategy: new SqsTransporterServer(configService.worker.queue.url),
  });

  await app.startAllMicroservices();
  await app.listen(3303);
  logger.log(`🚀 Worker is running on: ${await app.getUrl()}`, 'Bootstrap');
}
void bootstrap();
