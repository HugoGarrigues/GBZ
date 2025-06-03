import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe,UseGuards, Request } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ApiBearerAuth, ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { NotFoundException } from '@nestjs/common';
import { ExercisesService } from './exercises.service';
import { CreateExerciseDto } from './dto/create-exercise.dto';
import { UpdateExerciseDto } from './dto/update-exercise.dto';
import { ExerciseEntity } from './entities/exercise.entity';

@Controller('exercises')
@ApiTags('exercises')  
@Controller('exercises')
export class ExercisesController {
  constructor(private readonly exercisesService: ExercisesService) {}

  @Post()
  @UseGuards(JwtAuthGuard) 
  @ApiCreatedResponse({ type: ExerciseEntity })
  async create(@Body() createExerciseDto: CreateExerciseDto, @Request() req) {
    const userId = req.user.id;
    const exercise = await this.exercisesService.create(createExerciseDto, userId);
    return this.mapToExerciseEntity(exercise);
  }

  private mapToExerciseEntity(exercise: any): ExerciseEntity {
    return new ExerciseEntity({
      ...exercise,
      muscles: exercise.muscles.map((m) => m.name),
      author: exercise.author
        ? {
            id: exercise.author.id,
            name: exercise.author.name,
            email: exercise.author.email,
            isAdmin: exercise.author.isAdmin,
            createdAt: exercise.author.createdAt ?? new Date(),
            updatedAt: exercise.author.updatedAt ?? new Date(),
          }
        : undefined,
    });
  }
  
  @Get()
  @UseGuards(JwtAuthGuard) 
  @ApiBearerAuth()
  @ApiOkResponse({ type: ExerciseEntity, isArray: true })
  async findAll() {
    const exercises = await this.exercisesService.findAll();
    return exercises.map((exercise) => this.mapToExerciseEntity(exercise));
  }
  
  @Get('drafts')
  @UseGuards(JwtAuthGuard) 
  @ApiBearerAuth() 
  @ApiOkResponse({ type: ExerciseEntity, isArray: true })
  async findDrafts() {
    const drafts = await this.exercisesService.findDrafts();
    return drafts.map((draft) => this.mapToExerciseEntity(draft));
  }
  
  @Get(':id')
  @UseGuards(JwtAuthGuard) 
  @ApiBearerAuth() 
  @ApiOkResponse({ type: ExerciseEntity })
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const exercise = await this.exercisesService.findOne(id);
    if (!exercise) {
      throw new NotFoundException(`Exercise with ID ${id} not found`);
    }
    return this.mapToExerciseEntity(exercise);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth() 
  @ApiCreatedResponse({ type: ExerciseEntity })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateExerciseDto: UpdateExerciseDto,
  ) {
    return new ExerciseEntity(
      await this.exercisesService.update(id, updateExerciseDto),
    );
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard) 
  @ApiBearerAuth()
  @ApiOkResponse({ type: ExerciseEntity })
  async remove(@Param('id', ParseIntPipe) id: number) {
    return new ExerciseEntity(await this.exercisesService.remove(id));
  }
}
