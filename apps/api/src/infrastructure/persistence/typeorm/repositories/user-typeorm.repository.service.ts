import { Injectable } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { Repository } from "typeorm"
import { CreateUserDto } from "../../../../application/dtos/create-user.dto"
import { User } from "../../../../domain/entities/user.entity"
import { IUserRepository } from "../../../../domain/repositories/user.repository"

@Injectable()
export class UserRepositoryTypeOrm implements IUserRepository {
  constructor(
    @InjectRepository(User)
    private readonly repository: Repository<User>,
  ) {}

  async getUsers(): Promise<User[]> {
    return this.repository.find()
  }

  async getUserById(globalUserId: string): Promise<User | null> {
    return this.repository.findOne({ where: { globalUserId } })
  }

  async createUser(user: CreateUserDto): Promise<User> {
    return this.repository.save(user)
  }
}
