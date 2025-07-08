import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { SharedModule } from './infrastructure/shared.module';
import { AppLoggerModule } from './infrastructure/logging/logger.module';
import { LoggerMiddleware } from './infrastructure/logging/logger.middleware';
import { OrganizationModule } from './organization/organization.module';
import { ProductModule } from './product/product.module';
import { AuditModule } from './audit/audit.module';

@Module({
  imports: [
    SharedModule,
    AppLoggerModule,
    OrganizationModule,
    ProductModule,
    AuditModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
