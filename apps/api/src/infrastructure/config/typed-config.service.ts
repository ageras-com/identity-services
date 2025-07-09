import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

export type EnvironmentType = 'development' | 'production' | 'test';

export interface ServerConfig {
  environment: EnvironmentType;
}

export interface ApiConfig {
  port: number;
}

export interface WorkerConfig {
  port: number;
  queue: {
    url: string;
  };
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
  api: ApiConfig;
  worker: WorkerConfig;
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
    };
  }

  get api(): ApiConfig {
    return {
      port: this.get<number>('API_PORT') as number,
    };
  }

  get worker(): WorkerConfig {
    return {
      port: this.get<number>('WORKER_PORT') as number,
      queue: {
        url: this.get<string>('WORKER_QUEUE_URL') as string,
      },
    };
  }

  // Database configuration
  get database(): DatabaseConfig {
    return {
      host: this.get<string>('DB_HOST') as string,
      port: this.get<number>('DB_PORT') as number,
      username: this.get<string>('DB_USERNAME') as string,
      password: this.get<string>('DB_PASSWORD') as string,
      name: this.get<string>('DB_NAME') as string,
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
      server: this.server,
      database: this.database,
      api: this.api,
      worker: this.worker,
    };
  }
}
