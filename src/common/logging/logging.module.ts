import {
  Global,
  Module,
  MiddlewareConsumer,
  RequestMethod,
} from '@nestjs/common';

import { LoggingMiddleware } from './middlewares/logging.middleware';
import { LoggingService } from './services/logging.service';

@Global()
@Module({
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
