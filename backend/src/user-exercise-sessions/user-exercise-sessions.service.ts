import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserExerciseSessionDto } from './dto/create-user-exercise-session.dto';
import { UpdateUserExerciseSessionDto } from './dto/update-user-exercise-session.dto';
import { NotFoundException } from '@nestjs/common/exceptions/not-found.exception';

@Injectable()
export class UserExerciseSessionsService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateUserExerciseSessionDto) {
    // Optionnel : vérifier que user, session et exercise existent
    const user = await this.prisma.user.findUnique({ where: { id: dto.userId } });
    const session = await this.prisma.session.findUnique({ where: { id: dto.sessionId } });
    const exercise = await this.prisma.exercise.findUnique({ where: { id: dto.exerciseId } });
    if (!user || !session || !exercise) {
      throw new BadRequestException('User, Session or Exercise not found');
    }

    // Créer ou mettre à jour le userExerciseSession
    return this.prisma.userExerciseSession.upsert({
      where: {
        userId_sessionId_exerciseId: {
          userId: dto.userId,
          sessionId: dto.sessionId,
          exerciseId: dto.exerciseId,
        },
      },
      create: {
        userId: dto.userId,
        sessionId: dto.sessionId,
        exerciseId: dto.exerciseId,
        sets: dto.sets,
        reps: dto.reps,
      },
      update: {
        sets: dto.sets,
        reps: dto.reps,
      },
    });
  }

  async update(id: number, updateDto: UpdateUserExerciseSessionDto) {
    // Vérifie que la UserExerciseSession existe
    const existing = await this.prisma.userExerciseSession.findUnique({
      where: { id },
    });
    if (!existing) {
      throw new NotFoundException(`UserExerciseSession avec id ${id} non trouvée`);
    }

    // Validation existence user, session, exercise si fournis
    if (updateDto.userId) {
      const userExists = await this.prisma.user.findUnique({
        where: { id: updateDto.userId },
      });
      if (!userExists) {
        throw new BadRequestException(`Utilisateur avec id ${updateDto.userId} introuvable`);
      }
    }

    if (updateDto.sessionId) {
      const sessionExists = await this.prisma.session.findUnique({
        where: { id: updateDto.sessionId },
      });
      if (!sessionExists) {
        throw new BadRequestException(`Session avec id ${updateDto.sessionId} introuvable`);
      }
    }

    if (updateDto.exerciseId) {
      const exerciseExists = await this.prisma.exercise.findUnique({
        where: { id: updateDto.exerciseId },
      });
      if (!exerciseExists) {
        throw new BadRequestException(`Exercice avec id ${updateDto.exerciseId} introuvable`);
      }
    }

    // Prépare les données à mettre à jour (uniquement les champs fournis)
    const dataToUpdate: any = {};
    if (updateDto.userId !== undefined) dataToUpdate.userId = updateDto.userId;
    if (updateDto.sessionId !== undefined) dataToUpdate.sessionId = updateDto.sessionId;
    if (updateDto.exerciseId !== undefined) dataToUpdate.exerciseId = updateDto.exerciseId;
    if (updateDto.sets !== undefined) dataToUpdate.sets = updateDto.sets;
    if (updateDto.reps !== undefined) dataToUpdate.reps = updateDto.reps;

    // Mise à jour dans la base
    const updated = await this.prisma.userExerciseSession.update({
      where: { id },
      data: dataToUpdate,
    });

    return updated;
  }

  findByUser(userId: number) {
    return this.prisma.userExerciseSession.findMany({
      where: { userId },
      include: {
        session: true,
        exercise: true,
      },
    });
  }

  async remove(id: number) {
    // Vérifie que l'entrée existe
    const record = await this.prisma.userExerciseSession.findUnique({ where: { id } });
    if (!record) {
      throw new NotFoundException(`UserExerciseSession with id ${id} not found`);
    }
    // Supprime l'entrée
    return this.prisma.userExerciseSession.delete({ where: { id } });
  }
  
}
