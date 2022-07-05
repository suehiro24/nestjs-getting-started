import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

// Class based Middleware
@Injectable()
export class GlobalLoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    console.log('[Log] GlobalLoggerMiddleware');
    next();
  }
}

// Functional Middleware
export const globalLoggerFunctionalMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  // When first access or hard refresh, Global middlewares run twice
  // See: https://stackoverflow.com/questions/53557210/nodejs-with-express-why-my-middleware-is-executing-twice-here-is-the-code#answer-56941238
  console.log('Accessed: ' + req.originalUrl);
  console.log('[Log] globalLoggerFunctionalMiddleware');
  next();
};
