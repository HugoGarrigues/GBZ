import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, } from '@nestjs/common';
import { NotFoundException } from '@nestjs/common';
import { ExercisesService } from './exercises.service';
import { CreateExerciseDto } from './dto/create-exercise.dto';
import { UpdateExerciseDto } from './dto/update-exercise.dto';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { ExerciseEntity } from './entities/exercise.entity';

@Controller('exercises')
@ApiTags('exercises')
export class ExercisesController {
  constructor(private readonly exercisesService: ExercisesService) { }

  @Post()
  @ApiCreatedResponse({ type: ExerciseEntity })
  async create(@Body() createExerciseDto: CreateExerciseDto) {
    return new ExerciseEntity(
      await this.exercisesService.create(createExerciseDto),
    );
  }

  @Get()
  @ApiOkResponse({ type: ExerciseEntity, isArray: true })
  async findAll() {
    const exercises = await this.exercisesService.findAll();
    return exercises.map((exercise) => new ExerciseEntity(exercise));
  }

  @Get('drafts')
  @ApiOkResponse({ type: ExerciseEntity, isArray: true })
  async findDrafts() {
    const drafts = await this.exercisesService.findDrafts();
    return drafts.map((draft) => new ExerciseEntity(draft));
  }

  @Get(':id')
  @ApiOkResponse({ type: ExerciseEntity })
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const exercise = await this.exercisesService.findOne(id);
    if (!exercise) {
      throw new NotFoundException(`Exercise with ID ${id} not found`);
    }
    
    return new ExerciseEntity({
      ...exercise,
      author: exercise.author ?? undefined,
    }
    );
  }

  @Patch(':id')
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
  @ApiOkResponse({ type: ExerciseEntity })
  async remove(@Param('id', ParseIntPipe) id: number) {
    return new ExerciseEntity(await this.exercisesService.remove(id));
  }
}
