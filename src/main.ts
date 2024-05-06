import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  app.setGlobalPrefix('v1/');
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(configService.get('PORT') || 3000);
}
bootstrap();
