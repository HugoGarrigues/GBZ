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

@Module({
  imports: [PrismaModule, UsersModule, AuthModule, ExercisesModule, MusclesModule, SessionsModule, ProgramsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
