import * as winston from 'winston';
import { Format } from 'logform';
import { Injectable } from '@nestjs/common';
import {
  utilities as nestWinstonModuleUtilities,
  WinstonModuleOptions,
  WinstonModuleOptionsFactory,
} from 'nest-winston';
import { TypedConfigService } from '../config/typed-config.service';

@Injectable()
export class WinstonService implements WinstonModuleOptionsFactory {
  constructor(private readonly configService: TypedConfigService) {}

  createWinstonModuleOptions(): WinstonModuleOptions {
    return {
      level: this.configService.logger.level,
      defaultMeta: { service: 'identity-services-api' },
      transports: [
        new winston.transports.Console({
          format: this.formatFn(),
        }),
      ],
    };
  }

  /**
   * Select the format for log.
   * It will be JSON in production and a nicer pretty print for development.
   */
  formatFn(): Format {
    if (this.configService.server.environment === 'production') {
      return winston.format.json();
    } else {
      return winston.format.combine(
        winston.format.timestamp(),
        winston.format.ms(),
        nestWinstonModuleUtilities.format.nestLike('identity-services-api', {
          colors: true,
          prettyPrint: true,
          processId: false,
          appName: false,
        }),
      );
    }
  }
}
