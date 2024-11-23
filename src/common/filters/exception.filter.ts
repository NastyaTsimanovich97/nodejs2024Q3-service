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
const SPLIT_PATTERN = '\n    at ';
const POINT_PATTERN = '. ';

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

    let message = exception?.message || INTERNAL_SERVER_ERROR;
    const stack = exception.stack.toString().split(SPLIT_PATTERN);

    message = message + POINT_PATTERN + stack[1];

    response.status(status).json({
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      message,
    });
  }
}
