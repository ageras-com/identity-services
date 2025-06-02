import { Body, Controller, Get, Param, Post } from "@nestjs/common"
import { UserService } from "../application/services/user.service"
import { UserDto } from "../application/dtos/user.dto"
import { CreateUserDto } from "../application/dtos/create-user.dto"

@Controller("users")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  getUsers(): Promise<UserDto[]> {
    return this.userService.getUsers()
  }

  @Get(":id")
  getUserById(@Param("id") id: string): Promise<UserDto> {
    return this.userService.getUserById(id)
  }

  @Post()
  createUser(@Body() user: CreateUserDto): Promise<UserDto> {
    return this.userService.createUser(user)
  }
}
