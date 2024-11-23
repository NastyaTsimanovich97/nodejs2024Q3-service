import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { LoggingService } from '../services/logging.service';

@Injectable()
export class LoggingMiddleware implements NestMiddleware {
  constructor(private readonly loggingService: LoggingService) {}

  use(req: Request, res: Response, next: NextFunction) {
    const { url, query, body, method } = req;
    const originalSend = res.send.bind(res);  
    
    let responseBody: any;  

    res.send = function (data: any) {  
      responseBody = data; // Store the response data  
      return originalSend(data); // Call the original send method  
    };  

    // Log the incoming request
    this.loggingService.log(`[Request] ${method} ${url}`);
    Object.keys(query).length &&
      this.loggingService.log(`[Request query] ${JSON.stringify(query)}`);
    Object.keys(body).length &&
      this.loggingService.log(`[Request body] ${JSON.stringify(body)}`);

    // Capture the response to log status code after response is sent
    res.on('finish', () => {
      this.loggingService.log(`[Response] ${res.statusCode} ${url}`);
      this.loggingService.log(`[Response data] ${responseBody}`);
    });

    next();
  }
}
