import { Injectable, Logger } from '@nestjs/common';
import { UserDto } from './dto/user.dto';
import { UserRepository } from './user.repository';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name);

  constructor(private readonly userRepository: UserRepository) {}

  async getUsers(): Promise<UserDto[]> {
    this.logger.debug('Getting all users');
    const users = await this.userRepository.getUsers();
    return users.map((user) => ({
      globalUserId: user.globalUserId,
      phoneNumber: user.phoneNumber,
      email: user.email,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    }));
  }

  async getUserById(id: string): Promise<UserDto> {
    this.logger.debug(`Getting user by id: ${id}`);
    const user = await this.userRepository.getUserById(id);

    if (!user) {
      throw new Error(`User with id ${id} not found`);
    }

    return {
      globalUserId: user.globalUserId,
      phoneNumber: user.phoneNumber,
      email: user.email,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  }

  async createUser(user: CreateUserDto): Promise<UserDto> {
    this.logger.debug(`Creating user with name: ${user.email}`, user);
    const userCreated = await this.userRepository.createUser(user);

    return {
      globalUserId: userCreated.globalUserId,
      email: userCreated.email,
      phoneNumber: userCreated.phoneNumber,
      createdAt: userCreated.createdAt,
      updatedAt: userCreated.updatedAt,
    };
  }
}
