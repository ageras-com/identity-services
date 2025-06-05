import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common"
import { SharedModule } from "./shared/shared.module"
import { AppLoggerModule } from "./shared/logging/logger.module"
import { LoggerMiddleware } from "./shared/logging/logger.middleware"

@Module({
  imports: [SharedModule, AppLoggerModule],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes("*")
  }
}
