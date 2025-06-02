import { IsDate, IsString, IsUUID } from "@nestjs/class-validator"

export class UserDto {
  @IsUUID()
  id: string

  @IsString()
  name: string

  @IsDate()
  createdAt: Date

  @IsDate()
  updatedAt: Date
}
