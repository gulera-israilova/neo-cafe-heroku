import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as dotenv from 'dotenv';
dotenv.config();
const timeout = require('connect-timeout');

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  const PORT = process.env.PORT || 8080;
  app.setGlobalPrefix('api');
  app.use(timeout('50s'));
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
  const config = new DocumentBuilder()
    .setTitle('Neocafe NodeJS')
    .setDescription('API documentation for second project at NEOBIS ')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);
  app.enableCors();
  await app.listen(PORT, () => console.log(`App started on port ${PORT}`));
}
bootstrap();
