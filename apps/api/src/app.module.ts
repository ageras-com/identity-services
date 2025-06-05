import { Module } from "@nestjs/common"
import { SharedModule } from "./shared/shared.module"
import { ConfigModule } from "@nestjs/config"
import configuration from "./infrastructure/config/configuration"

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      isGlobal: true,
    }),
    SharedModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
