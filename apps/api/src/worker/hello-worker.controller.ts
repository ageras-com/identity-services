import { Controller, Logger } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';

@Controller()
export class HelloWorkerController {
  private readonly logger = new Logger(HelloWorkerController.name);

  @MessagePattern({ eventType: 'hello', version: 1 })
  sayHelloV1(): void {
    this.logger.log('Hello v1 !');
  }

  @MessagePattern({ eventType: 'hello', version: 2 })
  sayHelloV2(): void {
    this.logger.log('Hello v2 !');
  }
}
