import { Inject, Injectable, Optional } from '@nestjs/common';
import { CatsServiceBase } from './interfaces/cat-service.interface';
import { Cat } from './interfaces/cat.interface';

@Injectable()
export class CatsService<T> extends CatsServiceBase {
  @Optional()
  @Inject('OPTION1')
  private readonly propertyBasedOption: T;

  constructor(
    @Optional()
    @Inject('OPTION2')
    private readonly constructorBasedOption?: T,
  ) {
    super();
    console.log('propertyBasedOption: ' + this.propertyBasedOption); // undefined
    console.log('constructorBasedOption: ' + this.constructorBasedOption);
  }

  create(cat: Cat): void {
    this.cats.push(cat);
  }

  findAll(): Cat[] {
    console.log('propertyBasedOption: ' + this.propertyBasedOption);
    console.log('constructorBasedOption: ' + this.constructorBasedOption);
    return this.cats;
  }
}
