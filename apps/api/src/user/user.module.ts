import { Module } from "@nestjs/common"
import { TypeOrmModule } from "@nestjs/typeorm"
import { User } from "./domain/entities/user.entity"
import { UserController } from "./presentation/user.controller"
import { UserRepositoryTypeOrm } from "./infrastructure/persistence/typeorm/repositories/user-typeorm.repository.service"
import { IUserRepository } from "./domain/repositories/user.repository"
import { UserService } from "./application/services/user.service"

@Module({
  controllers: [UserController],
  imports: [TypeOrmModule.forFeature([User])],
  providers: [
    UserService,
    {
      provide: IUserRepository,
      useClass: UserRepositoryTypeOrm,
    },
  ],
})
export class UserModule {}
