import { IsDate, IsOptional, IsString, IsUUID } from '@nestjs/class-validator';

export class UserDto {
  @IsUUID()
  globalUserId: string;

  @IsString()
  email: string | null;

  @IsOptional()
  @IsString()
  phoneNumber?: string | null;

  @IsDate()
  createdAt: Date;

  @IsDate()
  updatedAt: Date;
}
