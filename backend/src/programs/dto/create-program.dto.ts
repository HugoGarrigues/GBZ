import { IsString, IsNotEmpty, IsOptional, IsArray, ArrayUnique, ArrayNotEmpty, IsInt } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateProgramDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'Name of the program' })
  name: string;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional({ description: 'Description of the program' })
  description?: string;

  @IsArray()
  @ArrayNotEmpty()
  @ArrayUnique()
  @IsInt({ each: true })
  @ApiProperty({ description: 'List of session IDs associated with the program', type: [Number] })
  sessionsIds: number[];
}
