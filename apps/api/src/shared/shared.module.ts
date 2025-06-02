import { Module } from "@nestjs/common"
import { TypeOrmModule } from "@nestjs/typeorm"
import { dataSourceOptions } from "./infrastructure/config/typeorm"

@Module({
  imports: [TypeOrmModule.forRoot(dataSourceOptions)],
})
export class SharedModule {}
