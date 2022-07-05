import { Cat } from './cat.interface';

export abstract class CatsServiceBase {
  protected readonly cats: Cat[] = [];

  abstract create(cat: Cat): void;
  abstract findAll(): Cat[];
}
