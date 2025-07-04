import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateMuscleDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;
}
