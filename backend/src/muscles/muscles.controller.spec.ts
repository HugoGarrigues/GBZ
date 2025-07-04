import { Test, TestingModule } from '@nestjs/testing';
import { MusclesController } from './muscles.controller';
import { MusclesService } from './muscles.service';

describe('MusclesController', () => {
  let controller: MusclesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MusclesController],
      providers: [MusclesService],
    }).compile();

    controller = module.get<MusclesController>(MusclesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
