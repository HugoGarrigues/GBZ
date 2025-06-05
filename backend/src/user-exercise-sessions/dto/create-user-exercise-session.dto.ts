// src/user-exercise-sessions/dto/create-user-exercise-session.dto.ts
import { IsInt, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserExerciseSessionDto {
  @ApiProperty({
    description: 'ID de l’utilisateur',
    example: 1,
  })
  @IsInt()
  userId: number;

  @ApiProperty({
    description: 'ID de la session d’entraînement',
    example: 2,
  })
  @IsInt()
  sessionId: number;

  @ApiProperty({
    description: 'ID de l’exercice',
    example: 3,
  })
  @IsInt()
  exerciseId: number;

  @ApiProperty({
    description: 'Nombre de séries (sets)',
    example: 4,
    minimum: 1,
  })
  @IsInt()
  @Min(1)
  sets: number;

  @ApiProperty({
    description: 'Nombre de répétitions par série (reps)',
    example: 10,
    minimum: 1,
  })
  @IsInt()
  @Min(1)
  reps: number;
}
