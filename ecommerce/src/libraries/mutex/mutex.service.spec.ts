import { Test, TestingModule } from '@nestjs/testing';
import { MutexService } from './mutex.service';

describe('MutexService', () => {
  let service: MutexService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MutexService],
    }).compile();

    service = module.get<MutexService>(MutexService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
