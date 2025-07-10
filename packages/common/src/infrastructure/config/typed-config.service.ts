import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

export type EnvironmentType = 'development' | 'production' | 'test';

export interface ServerConfig {
  port: number;
  environment: EnvironmentType;
}
export interface DatabaseConfig {
  host: string;
  port: number;
  username: string;
  password: string;
  name: string;
}
export interface LoggerConfig {
  level: string;
}

export interface AppConfig {
  server: ServerConfig;
  database: DatabaseConfig;
}

@Injectable()
export class TypedConfigService extends ConfigService {
  constructor() {
    super();
  }

  // Server configuration
  get server(): ServerConfig {
    return {
      environment: this.get<EnvironmentType>('NODE_ENV') as EnvironmentType,
      port: this.get<number>('PORT') as number,
    };
  }

  // Database configuration
  get database(): DatabaseConfig {
    return {
      host: this.get<string>('DB_HOST') as string,
      name: this.get<string>('DB_NAME') as string,
      password: this.get<string>('DB_PASSWORD') as string,
      port: this.get<number>('DB_PORT') as number,
      username: this.get<string>('DB_USERNAME') as string,
    };
  }

  get logger(): LoggerConfig {
    return {
      level: this.get<string>('LOG_LEVEL') as string,
    };
  }

  // Helper method to get all configuration at once
  get appConfig(): AppConfig {
    return {
      database: this.database,
      server: this.server,
    };
  }
}
