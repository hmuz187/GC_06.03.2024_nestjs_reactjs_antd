import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';

import { configDotenv } from 'dotenv';
import {join} from 'path';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';


async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  
  app.useStaticAssets(join(__dirname, '..', 'public'));
  app.setBaseViewsDir(join(__dirname, '..', 'views'));
  app.setViewEngine('hbs');
  
  app.useGlobalPipes(
    new ValidationPipe({transform: true})
  );
  configDotenv();

  app.enableCors();
  await app.listen(process.env.PORT);
}
bootstrap();
