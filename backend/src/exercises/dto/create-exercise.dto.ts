import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
  IsArray,
  ArrayNotEmpty,
  IsInt,
} from 'class-validator';

export class CreateExerciseDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(5)
  @ApiProperty({ description: 'Nom de l\'exercice' })
  name: string;

  @IsString()
  @IsOptional()
  @MaxLength(300)
  @ApiProperty({ description: 'Description de l\'exercice', required: false })
  description?: string;

  @IsArray()
  @ArrayNotEmpty()
  @IsInt({ each: true })
  @ApiProperty({
    type: [Number],
    description: 'Liste des IDs des muscles associés à l\'exercice',
    example: [5],
  })
  musclesIds: number[];

  @IsBoolean()
  @IsOptional()
  @ApiProperty({ required: false, default: false, description: 'Si l\'exercice est publié' })
  published?: boolean = false;
}
