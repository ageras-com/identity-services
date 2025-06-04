import { Module } from "@nestjs/common"
import { TypeOrmModule } from "@nestjs/typeorm"
import { UserController } from "../presentation/user.controller"
import { User } from "../domain/entities/user.entity"
import { UserService } from "../application/services/user.service"
import { IUserRepository } from "../domain/repositories/user.repository"
import { UserRepositoryTypeOrm } from "../infrastructure/persistence/typeorm/repositories/user-typeorm.repository.service"

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
