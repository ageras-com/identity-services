import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

export interface ServerConfig {
  port: number;
  environment: 'development' | 'production' | 'test';
}
export interface DatabaseConfig {
  host: string;
  port: number;
  username: string;
  password: string;
  database: string;
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
      port: this.get<number>('PORT', 3301),
      environment: this.get<'development' | 'production' | 'test'>(
        'NODE_ENV',
        'development',
      ),
    };
  }

  // Database configuration
  get database(): DatabaseConfig {
    return {
      host: this.get<string>('DB_HOST', 'localhost'),
      port: this.get<number>('DB_PORT', 5432),
      username: this.get<string>('DB_USERNAME', 'postgres'),
      password: this.get<string>('DB_PASSWORD', 'postgres'),
      database: this.get<string>('DB_DATABASE', 'identity-services'),
    };
  }

  get logger(): LoggerConfig {
    return {
      level: this.get<string>('LOG_LEVEL', 'info'),
    };
  }

  // Helper method to get all configuration at once
  get appConfig(): AppConfig {
    return {
      server: this.server,
      database: this.database,
    };
  }
}
