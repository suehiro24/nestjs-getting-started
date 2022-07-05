import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

// Class based Middleware
@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    console.log('[Log] LoggerMiddleware');
    next();
  }
}

// Functional Middleware
export const loggerFunctionalMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  console.log('[Log] loggerFunctionalMiddleware');
  next();
};
