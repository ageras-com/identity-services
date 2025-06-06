import { Module } from "@nestjs/common"
import { WinstonModule } from "nest-winston"
import { WinstonConfigService } from "../../infrastructure/config/winston"

@Module({
  imports: [
    WinstonModule.forRootAsync({
      useClass: WinstonConfigService,
    }),
  ],
})
export class AppLoggerModule {}
