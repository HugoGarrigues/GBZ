import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateExerciseDto } from './dto/create-exercise.dto';
import { UpdateExerciseDto } from './dto/update-exercise.dto';

@Injectable()
export class ExercisesService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createExerciseDto: CreateExerciseDto, userId: number) {
    const { name, musclesIds, ...rest } = createExerciseDto;

    const existingExercise = await this.prisma.exercise.findFirst({
      where: {
        name: {
          equals: name,
          mode: 'insensitive',
        },
      },
    });

    if (existingExercise) {
      throw new BadRequestException(`Un exercice nommé "${name}" existe déjà.`);
    }

    if (musclesIds?.length) {
      const muscles = await this.prisma.muscle.findMany({
        where: { id: { in: musclesIds } },
      });

      if (muscles.length !== musclesIds.length) {
        throw new BadRequestException('Un ou plusieurs muscles sont invalides');
      }
    }

    return this.prisma.exercise.create({
      data: {
        ...rest,
        name,
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

  async update(id: number, updateExerciseDto: UpdateExerciseDto) {
    await this.findOne(id);

    const { name, musclesIds, ...rest } = updateExerciseDto;

    if (name) {
      const existingExercise = await this.prisma.exercise.findFirst({
        where: {
          name: {
            equals: name,
            mode: 'insensitive',
          },
          NOT: { id },
        },
      });

      if (existingExercise) {
        throw new BadRequestException(`Un exercice nommé "${name}" existe déjà.`);
      }
    }

    if (musclesIds?.length) {
      const muscles = await this.prisma.muscle.findMany({
        where: { id: { in: musclesIds } },
      });

      if (muscles.length !== musclesIds.length) {
        throw new BadRequestException('Un ou plusieurs muscles sont invalides');
      }
    }

    const data: any = { ...rest };
    if (name !== undefined) data.name = name;
    if (musclesIds !== undefined) {
      data.muscles = {
        set: musclesIds.map(id => ({ id })),
      };
    }

    return this.prisma.exercise.update({
      where: { id },
      data,
      include: {
        muscles: true,
        author: true,
      },
    });
  }

  findAll() {
    return this.prisma.exercise.findMany({
      include: {
        muscles: true,
        author: true,
      },
    });
  }

  async findOne(id: number) {
    const exercise = await this.prisma.exercise.findUnique({
      where: { id },
      include: {
        muscles: true,
        author: true,
      },
    });
    if (!exercise) throw new NotFoundException(`Exercice ${id} introuvable`);
    return exercise;
  }

  async remove(id: number) {
    await this.findOne(id);
    return this.prisma.exercise.delete({ where: { id } });
  }
}
