/**
  AppModuleでConfigModule.forRoot()を実行しても、非rootなModuleの初期化時にはprocess.envを読み込めないため
  dotenvパッケージのconfig()であらかじめ環境変数をprocess.envにロードしておく.

  See: https://stackoverflow.com/questions/67482900/nestjs-not-reading-environmental-variables#answer-67483932

  ただし、非rootなModuleでprocess.envを参照せず、Factory ProviderでConfigServiceを利用する場合はこの処理は必要ない.
  (appのbootstrapの間に、別用途でprocess.envを呼びたいなら必要になるかも(そのときもConfigService参照すれば回避はできる))
  Ex.) cats.module.ts
 */
import { config } from 'dotenv';
config();

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}
bootstrap();
