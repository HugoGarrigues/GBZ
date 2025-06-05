import { Module } from '@nestjs/common';
import { UserExerciseSessionsService } from './user-exercise-sessions.service';
import { UserExerciseSessionsController } from './user-exercise-sessions.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [UserExerciseSessionsController],
  providers: [UserExerciseSessionsService, PrismaService],
})
export class UserExerciseSessionsModule {}
