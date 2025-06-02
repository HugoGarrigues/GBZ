import { Injectable } from '@nestjs/common';
import { CreateExerciseDto } from './dto/create-exercise.dto';
import { UpdateExerciseDto } from './dto/update-exercise.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ExercisesService {
  constructor(private prisma: PrismaService) {}

  create(createExerciseDto: CreateExerciseDto) {
    return this.prisma.exercise.create({ data: createExerciseDto });
  }

  findAll() {
    return this.prisma.exercise.findMany({ where: { published: true } });
  }

  findOne(id: number) {
    return this.prisma.exercise.findUnique({
      where: { id },
      include: {
        author: true,
      },
    });
  }

  findDrafts() {
    return this.prisma.exercise.findMany({ where: { published: false } });
  }

  update(id: number, updateExerciseDto: UpdateExerciseDto) {
    return this.prisma.exercise.update({
      where: { id },
      data: updateExerciseDto,
    });
  }

  remove(id: number) {
    return this.prisma.exercise.delete({ where: { id } });
  }
}

