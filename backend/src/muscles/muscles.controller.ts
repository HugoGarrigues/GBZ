// src/muscles/muscles.controller.ts
import {
  Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, Request,
  UseGuards
} from '@nestjs/common';
import { MusclesService } from './muscles.service';
import { CreateMuscleDto } from './dto/create-muscle.dto';
import { UpdateMuscleDto } from './dto/update-muscle.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RolesGuard } from 'src/auth/roles.guard';

@ApiTags('muscles')
@Controller('muscles')
export class MusclesController {
  constructor(private readonly musclesService: MusclesService) {}

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiBearerAuth()
  @Post()
  create(@Body() createMuscleDto: CreateMuscleDto, @Request() req) {
    const adminUserId = req.user.id;  // supposant que ton middleware/auth ajoute l’utilisateur dans req.user
    return this.musclesService.create(createMuscleDto, adminUserId);
  }
  
  @Get()
  findAll() {
    return this.musclesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.musclesService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiBearerAuth()
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateMuscleDto: UpdateMuscleDto,
  ) {
    return this.musclesService.update(id, updateMuscleDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiBearerAuth()
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.musclesService.remove(id);
  }
}
