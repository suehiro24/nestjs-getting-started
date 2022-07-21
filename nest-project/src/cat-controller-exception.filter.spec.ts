import { CatControllerExceptionFilter } from './cat-controller-exception.filter';

describe('CatControllerExceptionFilter', () => {
  it('should be defined', () => {
    expect(new CatControllerExceptionFilter()).toBeDefined();
  });
});
