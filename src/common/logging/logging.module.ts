import {
  Global,
  Module,
  MiddlewareConsumer,
  RequestMethod,
} from '@nestjs/common';

import { ConfigModule } from '@nestjs/config';

import { LoggingMiddleware } from './middlewares/logging.middleware';
import { LoggingService } from './services/logging.service';

@Global()
@Module({
  imports: [ConfigModule],
  providers: [LoggingService],
  exports: [LoggingService],
})
export class LoggingModule {
  configure(consumer: MiddlewareConsumer) {
    // Apply the logging middleware to all routes
    consumer
      .apply(LoggingMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
