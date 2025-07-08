import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { InfrastructureModule } from './infrastructure/infrastructure.module';
import { LoggerMiddleware } from './infrastructure/logging/logger.middleware';
import { OrganizationModule } from './organization/organization.module';
import { AuditModule } from './audit/audit.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [InfrastructureModule, UserModule, OrganizationModule, AuditModule],
  controllers: [],
  providers: [],
})
export class ApiModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
