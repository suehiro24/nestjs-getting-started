import { Module } from '@nestjs/common';
import { CatsService } from './cats.service';
import { CatsServiceBase } from './interfaces/cat-service.interface';
import { CatsServiceMock } from './mocks/cats.service.mock';
import { CatsController } from './cats.controller';
import { ConfigService } from '@nestjs/config';

@Module({
  controllers: [CatsController],
  providers: [
    // Class Provider
    {
      provide: CatsServiceBase,
      useClass:
        process.env.NODE_ENV === 'development' ? CatsService : CatsServiceMock,
    },

    // Factory Provider
    // ConfigServiceを解決したうえで、process.env.NODE_ENVを参照する
    // Factory Provider を利用する場合はmain.tsの一番上でdotenv.config()する必要もない
    // {
    //   provide: CatsServiceBase,
    //   useFactory: (configService: ConfigService) => {
    //     return configService.get<string>('NODE_ENV') === 'development'
    //       ? new CatsService()
    //       : new CatsServiceMock();
    //   },
    //   inject: [ConfigService],
    // },

    // Value Provider (class based)
    {
      provide: CatsService,
      useValue:
        process.env.NODE_ENV === 'development'
          ? new CatsServiceMock()
          : new CatsService(),
    },

    // Value Provider (Non class based)
    {
      provide: 'STRING_VAL_TOKEN',
      useValue: '!!! Execute findAll handler !!!',
    },
    {
      provide: 'OPTION1',
      useValue: '!!! OPTION1 VALUE !!!',
    },
    {
      provide: 'OPTION2',
      useValue: '!!! OPTION2 VALUE !!!',
    },
  ],
})
export class CatsModule {}
