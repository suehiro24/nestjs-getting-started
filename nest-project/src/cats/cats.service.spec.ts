import { Test, TestingModule } from '@nestjs/testing';
import { CatsService } from './cats.service';
import { CatsServiceBase } from './interfaces/cat-service.interface';

describe('CatsService', () => {
  let service: CatsServiceBase;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CatsService],
    }).compile();

    service = module.get<CatsServiceBase>(CatsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
