import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  const docs = new DocumentBuilder()
    .setTitle('Home Library Service')
    .setDescription('Home Library API service')
    .setVersion('0.1')
    .build();

  const documentFactory = () => SwaggerModule.createDocument(app, docs);
  SwaggerModule.setup('doc', app, documentFactory);

  app.useGlobalPipes(new ValidationPipe({ transform: true, whitelist: true }));

  await app.listen(configService.get('port'));
}
bootstrap();
