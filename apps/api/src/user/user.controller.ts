import { CreateUserDto, UserDto, UserService } from '@identity-services/common';
import { Body, Controller, Get, Param, Post } from '@nestjs/common';

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
