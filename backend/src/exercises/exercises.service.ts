import { Injectable } from '@nestjs/common';
import { CreateExerciseDto } from './dto/create-exercise.dto';
import { UpdateExerciseDto } from './dto/update-exercise.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ExercisesService {
  constructor(private prisma: PrismaService) {}
  
  create(createExerciseDto: CreateExerciseDto, userId: number) {
    const { musclesIds, ...rest } = createExerciseDto;
  
    return this.prisma.exercise.create({
      data: {
        ...rest,
        authorId: userId,
        muscles: {
          connect: musclesIds.map(id => ({ id })),
        },
      },
      include: {
        muscles: true,
        author: true,
      },
    });
  }
  

  findAll() {
    return this.prisma.exercise.findMany({
      where: { published: true },
      include: {
        muscles: {
          select: { id: true, name: true },
        },
        author: {
          select: { id: true, name: true, email: true, isAdmin: true, createdAt: true, updatedAt: true },
        },
      },
    });
  }

  findOne(id: number) {
    return this.prisma.exercise.findUnique({
      where: { id },
      include: {
        author: {
          select: { id: true, name: true, email: true, isAdmin: true, createdAt: true, updatedAt: true},
        },
        muscles: {
          select: { id: true, name: true },
        },
        sessions: {
          select: { id: true, name: true },
        },
      },
    });
  }

  findDrafts() {
    return this.prisma.exercise.findMany({
      where: { published: false },
      include: {
        author: {
          select: { id: true, name: true },
        },
        muscles: {
          select: { id: true, name: true },
        },
      },
    });
  }

  update(id: number, updateExerciseDto: UpdateExerciseDto) {
    const { musclesIds, ...rest } = updateExerciseDto;
  
    return this.prisma.exercise.update({
      where: { id },
      data: {
        ...rest,
        muscles: musclesIds
          ? {
              set: musclesIds.map(id => ({ id })),
            }
          : undefined,
      },
    });
  }
  

  remove(id: number) {
    return this.prisma.exercise.delete({ where: { id } });
  }
}
