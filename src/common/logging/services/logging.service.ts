import { LoggerService, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class LoggingService implements LoggerService {
  constructor(private configService: ConfigService) {}

  private logLevel = this.configService.get('logging.level');

  /**
   * Write a 'log' level log.
   */
  log(message: any, ...optionalParams: any[]) {
    const timestamp = new Date().toISOString(); // Get the current timestamp

    console.log(timestamp, this.logLevel, message, ...optionalParams);
  }

  /**
   * Write an 'error' level log.
   */
  error(message: any, ...optionalParams: any[]) {
    const timestamp = new Date().toISOString(); // Get the current timestamp

    console.error(timestamp, this.logLevel, message, ...optionalParams);
  }

  /**
   * Write a 'warn' level log.
   */
  warn(message: any, ...optionalParams: any[]) {
    const timestamp = new Date().toISOString(); // Get the current timestamp

    console.warn(timestamp, this.logLevel, message, ...optionalParams);
  }

  /**
   * Write a 'debug' level log.
   */
  debug?(message: any, ...optionalParams: any[]) {
    const timestamp = new Date().toISOString(); // Get the current timestamp

    console.warn(timestamp, this.logLevel, message, ...optionalParams);
  }
}
