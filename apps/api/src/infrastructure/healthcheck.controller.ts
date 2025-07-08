import { Controller, Get } from '@nestjs/common';

/**
 * This controller should only hold the health check endpoint which is necessary for any container to satisfy the container healthchecks
 */
@Controller()
export class HealthcheckController {
  @Get('/health')
  getStatus(): { status: string } {
    return {
      status: 'running',
    };
  }
}
