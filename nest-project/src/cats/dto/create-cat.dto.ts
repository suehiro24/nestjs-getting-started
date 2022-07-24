import { Transform, TransformFnParams } from 'class-transformer';
import { IsNumber, IsString } from 'class-validator';
import { Cat } from '../interfaces/cat.interface';

export class CreateCatDto implements Cat {
  @IsString()
  name: string;

  @IsNumber()
  // @Transform((value: TransformFnParams) => parseInt(value.value))
  age: number;

  @IsString()
  breed: string;
}
