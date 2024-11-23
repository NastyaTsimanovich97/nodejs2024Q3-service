import { LoggerService, Injectable } from '@nestjs/common';

@Injectable()
export class LoggingService implements LoggerService {
  /**
   * Write a 'log' level log.
   */
  log(message: any, ...optionalParams: any[]) {
    const timestamp = new Date().toISOString(); // Get the current timestamp

    console.log(timestamp, 'LOG', message, ...optionalParams);
  }

  /**
   * Write an 'error' level log.
   */
  error(message: any, ...optionalParams: any[]) {
    const timestamp = new Date().toISOString(); // Get the current timestamp

    console.error(timestamp, 'ERROR', message, ...optionalParams);
  }

  /**
   * Write a 'warn' level log.
   */
  warn(message: any, ...optionalParams: any[]) {
    const timestamp = new Date().toISOString(); // Get the current timestamp

    console.warn(timestamp, 'WARN', message, ...optionalParams);
  }

  /**
   * Write a 'debug' level log.
   */
  debug?(message: any, ...optionalParams: any[]) {
    const timestamp = new Date().toISOString(); // Get the current timestamp

    console.warn(timestamp, 'DEBUG', message, ...optionalParams);
  }
}
