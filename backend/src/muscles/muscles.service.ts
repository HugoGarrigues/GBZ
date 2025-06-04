// src/muscles/muscles.service.ts
import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateMuscleDto } from './dto/create-muscle.dto';
import { UpdateMuscleDto } from './dto/update-muscle.dto';
@Injectable()
export class MusclesService {
  constructor(private readonly prisma: PrismaService) {}

  private capitalize(str: string): string {
    if (!str) return '';
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  }

  async create(createMuscleDto: CreateMuscleDto) {
    const name = this.capitalize(createMuscleDto.name);

    const existing = await this.prisma.muscle.findUnique({ where: { name } });

    if (existing) {
      throw new BadRequestException(`Le muscle "${name}" existe déjà.`);
    }

    return this.prisma.muscle.create({ data: { ...createMuscleDto, name } });
  }

  findAll() {
    return this.prisma.muscle.findMany({
      orderBy: { name: 'asc' },
    });
  }

  async findOne(id: number) {
    const muscle = await this.prisma.muscle.findUnique({ where: { id } });
    if (!muscle) throw new NotFoundException(`Muscle ${id} not found`);
    return muscle;
  }

  async update(id: number, updateMuscleDto: UpdateMuscleDto) {
    await this.findOne(id);

    const data = { ...updateMuscleDto };
    if (data.name) {
      data.name = this.capitalize(data.name);

      const existing = await this.prisma.muscle.findUnique({ where: { name: data.name } });

      if (existing && existing.id !== id) {
        throw new BadRequestException(`Le muscle "${data.name}" existe déjà.`);
      }
    }

    return this.prisma.muscle.update({ where: { id }, data });
  }

  async remove(id: number) {
    await this.findOne(id);
    return this.prisma.muscle.delete({ where: { id } });
  }
}
