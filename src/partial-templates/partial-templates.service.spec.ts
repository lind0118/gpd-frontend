import { Test, TestingModule } from '@nestjs/testing';
import { PartialTemplatesService } from './partial-templates.service';

describe('PartialTemplatesService', () => {
  let service: PartialTemplatesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PartialTemplatesService],
    }).compile();

    service = module.get<PartialTemplatesService>(PartialTemplatesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
