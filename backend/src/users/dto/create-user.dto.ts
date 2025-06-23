// src/users/dto/create-user.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEmail, MinLength, IsOptional, IsBoolean } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ example: 'HugoGarrigues' })
  @IsString()
  name: string;

  @ApiProperty({ example: 'garrigues@example.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'motdepasse123!' })
  @IsString()
  @MinLength(6)
  password: string;
}
