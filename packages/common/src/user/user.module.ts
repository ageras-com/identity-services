import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WinstonModule } from 'nest-winston';

import { User } from './entities/user.entity';
import { UserRepository } from './user.repository';
import { UserService } from './user.service';

@Module({
  exports: [UserService, UserRepository],
  imports: [TypeOrmModule.forFeature([User]), WinstonModule],
  providers: [UserService, UserRepository],
})
export class UserModule {}
