import { Module } from "@nestjs/common"
import { TypeOrmModule } from "@nestjs/typeorm"
import { UserModule } from "./user.module"
import { AppController } from "../presentation/app.controller"
import { dataSourceOptions } from "../infrastructure/config/typeorm/typeorm"

@Module({
  imports: [TypeOrmModule.forRoot(dataSourceOptions), UserModule],
  controllers: [AppController],
})
export class SharedModule {}
