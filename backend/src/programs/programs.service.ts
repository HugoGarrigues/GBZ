// src/programs/programs.service.ts
import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateProgramDto } from './dto/create-program.dto';
import { UpdateProgramDto } from './dto/update-program.dto';

@Injectable()
export class ProgramsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createProgramDto: CreateProgramDto, userId: number) {
    const { name, description, sessionsIds } = createProgramDto;

    // Vérifier unicité insensible à la casse
    const existing = await this.prisma.program.findFirst({
      where: {
        name: { equals: name, mode: 'insensitive' },
      },
    });
    if (existing) {
      throw new BadRequestException(`Le programme "${name}" existe déjà.`);
    }

    // Vérifier que les sessions existent si sessionsIds fournis
    if (sessionsIds && sessionsIds.length > 0) {
      const sessions = await this.prisma.session.findMany({
        where: { id: { in: sessionsIds } },
      });
      if (sessions.length !== sessionsIds.length) {
        throw new BadRequestException('Une ou plusieurs sessions sont invalides.');
      }
    }

    return this.prisma.program.create({
      data: {
        name,
        description,
        authorId: userId,
        sessions: sessionsIds ? { connect: sessionsIds.map(id => ({ id })) } : undefined,
      },
      include: {
        sessions: true,
      },
    });
  }

  findAll() {
    return this.prisma.program.findMany({
      include: {
        sessions: {
          include: {
            exercises: {
              include: {
                muscles: true,
              },
            },
          },
        },
      },
    });
  }

  async findOne(id: number) {
    const program = await this.prisma.program.findUnique({
      where: { id },
      include: {
        sessions: {
          include: {
            exercises: {
              include: {
                muscles: true,
              },
            },
          },
        },
      },
    });
    if (!program) {
      throw new NotFoundException(`Programme ${id} non trouvé`);
    }
    return program;
  }

  async update(id: number, updateProgramDto: UpdateProgramDto) {
    await this.findOne(id);

    if (updateProgramDto.name) {
      const existing = await this.prisma.program.findFirst({
        where: {
          name: { equals: updateProgramDto.name, mode: 'insensitive' },
          NOT: { id },
        },
      });
      if (existing) {
        throw new BadRequestException(`Le programme "${updateProgramDto.name}" existe déjà.`);
      }
    }

    if (updateProgramDto.sessionsIds) {
      const sessions = await this.prisma.session.findMany({
        where: { id: { in: updateProgramDto.sessionsIds } },
      });
      if (sessions.length !== updateProgramDto.sessionsIds.length) {
        throw new BadRequestException('Une ou plusieurs sessions sont invalides.');
      }
    }

    const data: any = {};
    if (updateProgramDto.name !== undefined) data.name = updateProgramDto.name;
    if (updateProgramDto.description !== undefined) data.description = updateProgramDto.description;
    if (updateProgramDto.sessionsIds !== undefined) {
      data.sessions = {
        set: updateProgramDto.sessionsIds.map(id => ({ id })),
      };
    }

    return this.prisma.program.update({
      where: { id },
      data,
      include: { sessions: true },
    });
  }

  async remove(id: number) {
    await this.findOne(id);
    return this.prisma.program.delete({ where: { id } });
  }
}
