import {
  AuditModule,
  InfrastructureModule,
  LoggerMiddleware,
  OrganizationModule,
  UserModule,
} from '@identity-services/common';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';

import { OrganizationController } from './organization/organization.controller';
import { UserController } from './user/user.controller';

@Module({
  controllers: [UserController, OrganizationController],
  imports: [InfrastructureModule, UserModule, OrganizationModule, AuditModule],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
