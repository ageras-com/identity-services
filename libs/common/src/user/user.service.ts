import { Injectable, Logger } from '@nestjs/common';

import { CreateUserDto } from './dto/create-user.dto';
import { UserDto } from './dto/user.dto';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name);

  constructor(private readonly userRepository: UserRepository) {}

  async getUsers(): Promise<UserDto[]> {
    this.logger.debug('Getting all blabla users 2');
    const users = await this.userRepository.getUsers();
    return users.map((user) => ({
      createdAt: user.createdAt,
      email: user.email,
      globalUserId: user.globalUserId,
      phoneNumber: user.phoneNumber,
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
      createdAt: user.createdAt,
      email: user.email,
      globalUserId: user.globalUserId,
      phoneNumber: user.phoneNumber,
      updatedAt: user.updatedAt,
    };
  }

  async createUser(user: CreateUserDto): Promise<UserDto> {
    this.logger.debug(`Creating user with name: ${user.email}`, user);
    const userCreated = await this.userRepository.createUser(user);

    return {
      createdAt: userCreated.createdAt,
      email: userCreated.email,
      globalUserId: userCreated.globalUserId,
      phoneNumber: userCreated.phoneNumber,
      updatedAt: userCreated.updatedAt,
    };
  }
}
