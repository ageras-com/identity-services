import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { UserService } from './user.service';
import { UserDto } from './dto/user.dto';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  getUsers(): Promise<UserDto[]> {
    return this.userService.getUsers();
  }

  @Get(':id')
  getUserById(@Param('id') id: string): Promise<UserDto> {
    return this.userService.getUserById(id);
  }

  @Post()
  createUser(@Body() user: CreateUserDto): Promise<UserDto> {
    return this.userService.createUser(user);
  }
}
