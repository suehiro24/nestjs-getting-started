import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  BadRequestException,
} from '@nestjs/common';
import { validate } from 'class-validator';
import { plainToInstance } from 'class-transformer';
import { CreateCatDto } from './cats/dto/create-cat.dto';

@Injectable()
export class CatValidationPipe implements PipeTransform<any> {
  async transform(value: any, { metatype }: ArgumentMetadata) {
    if (!metatype || !this.toValidate(metatype)) {
      return value;
    }

    // transform each params
    // if (metatype === CreateCatDto) {
    //   value.age = value.age ? parseInt(value.age) : 0;
    // }

    const object = plainToInstance(metatype, value, {
      // transform each params by "enableImplicitConversion" option
      // enableImplicitConversion: true,
    });
    const errors = await validate(object);
    if (errors.length > 0) {
      throw new BadRequestException('Validation failed', errors.toString());
    }
    return value;
  }

  private toValidate(metatype: Function): boolean {
    const types: Function[] = [String, Boolean, Number, Array, Object];
    return !types.includes(metatype);
  }
}
