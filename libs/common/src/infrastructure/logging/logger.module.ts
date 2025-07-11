import { Module } from '@nestjs/common';
import { WinstonModule } from 'nest-winston';

import { WinstonService } from './winston.service';

@Module({
  imports: [
    WinstonModule.forRootAsync({
      useClass: WinstonService,
    }),
  ],
})
export class AppLoggerModule {}
