import { Injectable } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { User } from "../../../../domain/entities/user.entity"
import { Repository } from "typeorm"
import { IUserRepository } from "../../../../domain/repositories/user.repository"
import { CreateUserDto } from "../../../../application/dtos/create-user.dto"

@Injectable()
export class UserRepositoryTypeOrm implements IUserRepository {
  constructor(
    @InjectRepository(User)
    private readonly repository: Repository<User>,
  ) {}

  async getUsers(): Promise<User[]> {
    return this.repository.find()
  }

  async getUserById(id: string): Promise<User | null> {
    return this.repository.findOne({ where: { id } })
  }

  async createUser(user: CreateUserDto): Promise<User> {
    return this.repository.save(user)
  }
}
