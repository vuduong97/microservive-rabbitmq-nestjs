import { Injectable, LoggerService } from '@nestjs/common';
import { createLogger, transports, format, addColors } from 'winston';

const colors = {
  error: 'red',
  warn: 'yellow',
  info: 'green',
  debug: 'magenta',
  http: 'white',
};
const logLevels = {
  error: 0,
  warn: 1,
  info: 2,
  http: 3,
  debug: 4,
  // verbose: 5,
  // silly: 6
};

@Injectable()
class Logger implements LoggerService {
  private logger;

  constructor() {
    const baseFormat = format.combine(
      format.label({ label: 'LOGGER' }),
      format.simple(),
      format.timestamp({ format: 'MMM-DD-YYYY HH:mm:ss' }),
      format.printf(
        (info) =>
          `[${info.label} ${info.timestamp}] ${info.level}: ${info.message}`,
      ),
    );

    this.logger = createLogger({
      transports: [
        new transports.Console({
          level: 'debug',
          format: format.combine(format.colorize({ all: true }), baseFormat),
        }),
        // new DailyRotateFile({
        //     filename: "winston/%DATE%/%DATE%-All.log",
        //     datePattern: "YYYY-MM-DD",
        //     level: "debug",
        //     // zippedArchive: true,
        //     maxSize: "20m",
        //     // maxFiles: "3d",
        // }),
      ],
      levels: logLevels,
      format: baseFormat,
    });
    addColors(colors);
  }

  log(message: string) {
    return this.logger.info(message);
  }

  info(message: string) {
    return this.logger.log({
      level: 'info',
      message: message,
    });
  }

  warn(message: string) {
    return this.logger.log({
      level: 'warn',
      message: message,
    });
  }

  error(message: string) {
    return this.logger.log({
      level: 'error',
      message: message,
    });
  }

  http(message: string) {
    return this.logger.log({
      level: 'http',
      message: message,
    });
  }

  debug(message: string) {
    return this.logger.log({
      level: 'debug',
      message: message,
    });
  }
}

export default new Logger();
