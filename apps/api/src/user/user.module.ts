import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';

import { WinstonModule } from 'nest-winston';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { UserRepository } from './user.repository';

@Module({
  controllers: [UserController],
  imports: [TypeOrmModule.forFeature([User]), WinstonModule],
  providers: [UserService, UserRepository],
})
export class UserModule {}
