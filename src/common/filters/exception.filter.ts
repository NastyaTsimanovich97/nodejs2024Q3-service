import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  InternalServerErrorException,
  HttpException,
  HttpStatus,
} from '@nestjs/common';

import { Request, Response } from 'express';

const INTERNAL_SERVER_ERROR = 'Internal Server Error';

@Catch()
export class InternalExceptionFilter implements ExceptionFilter {
  catch(exception: InternalServerErrorException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const message =
      exception?.getResponse?.() || exception?.message || INTERNAL_SERVER_ERROR;

    response.status(status).json({
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      message,
    });
  }
}
