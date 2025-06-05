import { Controller, Get, Post, Body, Param, ParseIntPipe, UseGuards, Request, Patch, Delete } from '@nestjs/common';
import { UserExerciseSessionsService } from './user-exercise-sessions.service';
import { CreateUserExerciseSessionDto } from './dto/create-user-exercise-session.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ApiTags, ApiBearerAuth, ApiOkResponse } from '@nestjs/swagger';
import { UpdateUserExerciseSessionDto } from './dto/update-user-exercise-session.dto';
import { UserExerciseSession } from './entities/user-exercise-session.entity';

@ApiTags('user-exercise-sessions')
@Controller('user-exercise-sessions')
export class UserExerciseSessionsController {
  constructor(private readonly userExerciseSessionsService: UserExerciseSessionsService) {}

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Post()
  async create(@Body() dto: CreateUserExerciseSessionDto, @Request() req) {
    dto.userId = req.user.id; // sécurité : forcer userId à celui du token
    return this.userExerciseSessionsService.create(dto);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ type: UserExerciseSession })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateDto: UpdateUserExerciseSessionDto,
    @Request() req,
  ) {
    return this.userExerciseSessionsService.update(id, updateDto);
  }

  @Get('user/:userId')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  async findByUser(@Param('userId', ParseIntPipe) userId: number, @Request() req) {
    return this.userExerciseSessionsService.findByUser(userId);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  async remove(@Param('id', ParseIntPipe) id: number) {
    return this.userExerciseSessionsService.remove(id);
  }
}
