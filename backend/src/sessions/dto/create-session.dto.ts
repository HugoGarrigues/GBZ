// src/sessions/dto/create-session.dto.ts
import { IsString, IsNotEmpty, IsArray, ArrayUnique, ArrayNotEmpty, IsInt, } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateSessionDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'Name of the session' })
  name: string;

  @IsArray()
  @ArrayNotEmpty()
  @ArrayUnique()
    @ApiProperty({
        description: 'List of exercise IDs associated with the session',
        type: [Number],
    })
  @IsInt({ each: true })
  exercisesIds: number[];
}
