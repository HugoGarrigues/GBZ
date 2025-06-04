// src/sessions/sessions.service.ts
import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateSessionDto } from './dto/create-session.dto';
import { UpdateSessionDto } from './dto/update-session.dto';

@Injectable()
export class SessionsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createSessionDto: CreateSessionDto, userId: number) {
    const { name, exercisesIds } = createSessionDto;
  
    const existingSession = await this.prisma.session.findFirst({
      where: {
        name: {
          equals: name,
          mode: 'insensitive', 
        },
      },
    });
  
    if (existingSession) {
      throw new BadRequestException(`Une session avec le nom "${name}" existe déjà.`);
    }
  
    if (exercisesIds && exercisesIds.length > 0) {
      const exercises = await this.prisma.exercise.findMany({
        where: { id: { in: exercisesIds } },
      });
      if (exercises.length !== exercisesIds.length) {
        throw new BadRequestException('Un ou plusieurs exercices sont invalides');
      }
    }
  
    return this.prisma.session.create({
      data: {
        name,
        authorId: userId,
        exercises: {
          connect: exercisesIds.map(id => ({ id })),
        },
      },
      include: {
        exercises: {
          include: {
            muscles: true,
          },
        },
      },
    });
  }
  
  async update(id: number, updateSessionDto: UpdateSessionDto) {
    await this.findOne(id);
  
    if (updateSessionDto.name) {
      const existingSession = await this.prisma.session.findFirst({
        where: {
          name: {
            equals: updateSessionDto.name,
            mode: 'insensitive',
          },
          NOT: { id }, 
        },
      });
  
      if (existingSession) {
        throw new BadRequestException(`Une session avec le nom "${updateSessionDto.name}" existe déjà.`);
      }
    }
  
    if (updateSessionDto.exercisesIds) {
      const exercises = await this.prisma.exercise.findMany({
        where: { id: { in: updateSessionDto.exercisesIds } },
      });
  
      if (exercises.length !== updateSessionDto.exercisesIds.length) {
        throw new BadRequestException('Un ou plusieurs exercices sont invalides');
      }
    }
  
    const data: any = {};
    if (updateSessionDto.name !== undefined) data.name = updateSessionDto.name;
    if (updateSessionDto.exercisesIds !== undefined) {
      data.exercises = {
        set: updateSessionDto.exercisesIds.map(id => ({ id })),
      };
    }
  
    return this.prisma.session.update({
      where: { id },
      data,
      include: {
        exercises: {
          include: { muscles: true }
        },
      },
    });
  }

  findAll() {
    return this.prisma.session.findMany({
      include: {
        exercises: {
          include: {
            muscles: true,
          },
        },
      },
    });
    
  }

  async findOne(id: number) {
    const session = await this.prisma.session.findUnique({
      where: { id },
      include: {
        exercises: {
          include: {
            muscles: true,
          },
        },
      }
    });
    if (!session) throw new NotFoundException(`Session ${id} not found`);
    return session;
  }

  async remove(id: number) {
    await this.findOne(id);
    return this.prisma.session.delete({ where: { id } });
  }
}
