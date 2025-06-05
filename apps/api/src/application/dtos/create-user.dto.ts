import { IsString } from "@nestjs/class-validator"
import { ApiProperty } from "@nestjs/swagger"

export class CreateUserDto {
  @ApiProperty({
    description: "The name of the user",
    example: "John Doe",
  })
  @IsString()
  name: string
}
