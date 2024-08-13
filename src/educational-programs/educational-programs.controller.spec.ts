import { Test, TestingModule } from '@nestjs/testing';
import { EducationalProgramsController } from './educational-programs.controller';
import { EducationalProgramsService } from './educational-programs.service';

describe('EducationalProgramsController', () => {
  let controller: EducationalProgramsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EducationalProgramsController],
      providers: [EducationalProgramsService],
    }).compile();

    controller = module.get<EducationalProgramsController>(
      EducationalProgramsController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
