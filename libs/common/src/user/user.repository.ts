import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserRepository {
  constructor(
    @InjectRepository(User)
    private readonly repository: Repository<User>,
  ) {}

  async getUsers(): Promise<User[]> {
    return this.repository.find();
  }

  async getUserById(globalUserId: string): Promise<User | null> {
    return this.repository.findOne({ where: { globalUserId } });
  }

  async createUser(user: CreateUserDto): Promise<User> {
    return this.repository.save(user);
  }
}
