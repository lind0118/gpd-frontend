import { Test, TestingModule } from '@nestjs/testing';
import { EducationalProgramsService } from './educational-programs.service';

describe('EducationalProgramsService', () => {
  let service: EducationalProgramsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EducationalProgramsService],
    }).compile();

    service = module.get<EducationalProgramsService>(
      EducationalProgramsService,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
