import { Test, TestingModule } from '@nestjs/testing';
import { CatsController } from './cats.controller';
import { CatsServiceBase } from './interfaces/cat-service.interface';
import { CatsServiceMock } from './mocks/cats.service.mock';

describe('CatsController', () => {
  let controller: CatsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CatsController],
      providers: [
        {
          provide: CatsServiceBase,
          useClass: CatsServiceMock,
        },
        {
          provide: 'STRING_VAL_TOKEN',
          useValue: '!!! Execute findAll handler in test !!!',
        },
      ],
    }).compile();

    controller = module.get<CatsController>(CatsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
