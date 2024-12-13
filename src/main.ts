import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { InternalExceptionFilter } from './common/filters/exception.filter';
import { LoggingService } from './common/logging/services/logging.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  const loggingService = app.get(LoggingService);

  process.on('uncaughtException', (error) => {
    loggingService.error(`Uncaught Exception: ${error.message}`, error.stack);
    process.exit(1);
  });
  process.on('unhandledRejection', (reason) => {
    loggingService.error(`Unhandled Rejection: ${reason}`);
  });

  app.useGlobalPipes(new ValidationPipe({ transform: true, whitelist: true }));
  app.useGlobalFilters(new InternalExceptionFilter());

  const docs = new DocumentBuilder()
    .addBearerAuth()
    .setTitle('Home Library Service')
    .setDescription('Home Library API service')
    .setVersion('0.1')
    .build();

  const documentFactory = () => SwaggerModule.createDocument(app, docs);
  SwaggerModule.setup('doc', app, documentFactory);

  await app.listen(configService.get('port'));
}
bootstrap();
