import { Test } from '@nestjs/testing';

import { KnexService } from './knex.service';

describe('KnexService', () => {
  let service: KnexService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [KnexService],
    }).compile();

    service = module.get(KnexService);
  });

  it('should be defined', () => {
    expect(service).toBeTruthy();
  });
});
