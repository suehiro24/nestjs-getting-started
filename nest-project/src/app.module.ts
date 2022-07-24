import {
  MiddlewareConsumer,
  Module,
  RequestMethod,
  ValidationPipe,
} from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import {
  loggerFunctionalMiddleware,
  LoggerMiddleware,
} from './middlewares/logger.middleware';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { CatsModule } from './cats/cats.module';
import { GlobalLoggerMiddleware } from './middlewares/globalLogger.middleware';
import { APP_FILTER, APP_PIPE } from '@nestjs/core';
import { AllExceptionsFilter } from './all-exceptions.filter';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), UsersModule, CatsModule],
  controllers: [AppController],
  providers: [
    AppService,
    // Use Exception filter in global scope with DI.
    // {
    //   provide: APP_FILTER,
    //   useClass: AllExceptionsFilter,
    // },
    // Use Validation pipe in global scope with DI.
    // {
    //   provide: APP_PIPE,
    //   useClass: ValidationPipe,
    // },
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware, loggerFunctionalMiddleware).forRoutes(
      { path: '/users/', method: RequestMethod.GET }, // users/ or users のみマッチ
      { path: '/cats', method: RequestMethod.GET }, // cats/(.*) と同義. 後ろに何がついてもOK
    );
    // .forRoutes('users', 'cats');
    // .forRoutes(UserController, CatsController);

    // To globalize, apply class based middleware to all routes
    // (main.tsで利用している INestAplication.use() がDI対応してないため)
    consumer.apply(GlobalLoggerMiddleware).forRoutes('*');
  }
}
