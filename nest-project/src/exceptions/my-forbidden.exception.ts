import { HttpException, HttpStatus } from '@nestjs/common';

export class MyForbiddenException extends HttpException {
  constructor() {
    super(
      // Override JSON response body
      {
        // original
        statusCode: 403,
        message: 'Forbidden',
        // added
        error: 'This is added property',
      },
      HttpStatus.FORBIDDEN,
    );
  }
}
