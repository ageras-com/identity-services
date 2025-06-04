import { Module } from "@nestjs/common"
import { TypeOrmModule } from "@nestjs/typeorm"
import { dataSourceOptions } from "./infrastructure/config/typeorm"
import { UserModule } from "./user.module"
import { AppController } from "../presentation/app.controller"

@Module({
  imports: [TypeOrmModule.forRoot(dataSourceOptions), UserModule],
  controllers: [AppController],
})
export class SharedModule {}
