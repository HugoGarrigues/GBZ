import { PartialType } from '@nestjs/swagger';
import { CreateUserExerciseSessionDto } from './create-user-exercise-session.dto';

export class UpdateUserExerciseSessionDto extends PartialType(CreateUserExerciseSessionDto) {}
