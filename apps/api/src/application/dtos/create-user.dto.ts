import { IsString } from "@nestjs/class-validator"
import { ApiProperty } from "@nestjs/swagger"

export class CreateUserDto {
  @ApiProperty({
    description: "The name of the user",
    example: "John Doe",
  })
  @IsString()
  email: string

  @ApiProperty({
    description: "The phone number of the user",
    example: "+1234567890",
    required: false,
  })
  @IsString()
  phoneNumber?: string
}
