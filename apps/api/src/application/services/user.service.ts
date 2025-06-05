import { Inject, Injectable } from "@nestjs/common"
import { IUserRepository } from "../../domain/repositories/user.repository"
import { CreateUserDto } from "../dtos/create-user.dto"
import { UserDto } from "../dtos/user.dto"
import configuration from "../../infrastructure/config/configuration"
import { ConfigType } from "@nestjs/config"

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: IUserRepository,
    @Inject(configuration.KEY)
    private config: ConfigType<typeof configuration>,
  ) {}

  async getUsers(): Promise<UserDto[]> {
    const users = await this.userRepository.getUsers()
    const host = this.config.port
    console.log(host)
    return users.map((user) => ({
      id: user.id,
      name: user.name,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    }))
  }

  async getUserById(id: string): Promise<UserDto> {
    const user = await this.userRepository.getUserById(id)

    if (!user) {
      throw new Error(`User with id ${id} not found`)
    }

    return {
      id: user.id,
      name: user.name,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    }
  }

  async createUser(user: CreateUserDto): Promise<UserDto> {
    const userCreated = await this.userRepository.createUser(user)

    return {
      id: userCreated.id,
      name: userCreated.name,
      createdAt: userCreated.createdAt,
      updatedAt: userCreated.updatedAt,
    }
  }
}
