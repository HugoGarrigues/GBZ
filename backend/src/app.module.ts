import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ExercisesModule } from './exercises/exercises.module';
import { MusclesModule } from './muscles/muscles.module';
import { SessionsModule } from './sessions/sessions.module';
import { ProgramsModule } from './programs/programs.module';
import { UserExerciseSessionsModule } from './user-exercise-sessions/user-exercise-sessions.module';

@Module({
  imports: [PrismaModule, UsersModule, AuthModule, ExercisesModule, MusclesModule, SessionsModule, ProgramsModule, UserExerciseSessionsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
