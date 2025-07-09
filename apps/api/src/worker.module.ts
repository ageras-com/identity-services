import { Module } from '@nestjs/common';
import { InfrastructureModule } from './infrastructure/infrastructure.module';
import { HelloWorkerController } from './worker/hello-worker.controller';

/**
 * The application's healthcheck must run. The AppController is therefore loaded even for the worker
 */
@Module({
  imports: [InfrastructureModule],
  controllers: [HelloWorkerController],
  providers: [],
})
export class WorkerModule {}
