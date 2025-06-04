// src/sessions/entities/session.entity.ts
import { ApiProperty } from '@nestjs/swagger';

class UserDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  isAdmin: boolean;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  constructor(partial: Partial<UserDto>) {
    Object.assign(this, partial);
  }
}

class ExerciseDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  constructor(partial: Partial<ExerciseDto>) {
    Object.assign(this, partial);
  }
}

class ProgramDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  constructor(partial: Partial<ProgramDto>) {
    Object.assign(this, partial);
  }
}

export class SessionEntity {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  @ApiProperty({ type: () => UserDto, nullable: true })
  author?: UserDto;

  @ApiProperty({ type: () => [ExerciseDto] })
  exercises: ExerciseDto[];

  @ApiProperty({ type: () => [ProgramDto] })
  programs: ProgramDto[];

  constructor(partial: Partial<SessionEntity>) {
    Object.assign(this, partial);

    if (partial.author) {
      this.author = new UserDto(partial.author);
    }
    if (partial.exercises) {
      this.exercises = partial.exercises.map(e => new ExerciseDto(e));
    } else {
      this.exercises = [];
    }
    if (partial.programs) {
      this.programs = partial.programs.map(p => new ProgramDto(p));
    } else {
      this.programs = [];
    }
  }
}
