import { Test, TestingModule } from '@nestjs/testing';
import { UserExerciseSessionsController } from './user-exercise-sessions.controller';
import { UserExerciseSessionsService } from './user-exercise-sessions.service';

describe('UserExerciseSessionsController', () => {
  let controller: UserExerciseSessionsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserExerciseSessionsController],
      providers: [UserExerciseSessionsService],
    }).compile();

    controller = module.get<UserExerciseSessionsController>(UserExerciseSessionsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
