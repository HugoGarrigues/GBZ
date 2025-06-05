import { Test, TestingModule } from '@nestjs/testing';
import { UserExerciseSessionsService } from './user-exercise-sessions.service';

describe('UserExerciseSessionsService', () => {
  let service: UserExerciseSessionsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserExerciseSessionsService],
    }).compile();

    service = module.get<UserExerciseSessionsService>(UserExerciseSessionsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
