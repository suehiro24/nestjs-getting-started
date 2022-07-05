import { CatsServiceBase } from '../interfaces/cat-service.interface';
import { Cat } from '../interfaces/cat.interface';

export class CatsServiceMock extends CatsServiceBase {
  create(cat: Cat) {
    console.log('Create successfully: ' + cat.name);
  }

  findAll(): Cat[] {
    return [{ name: 'Tama', age: 3, breed: 'Taro' }];
  }
}
