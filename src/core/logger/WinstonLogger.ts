import fs from 'fs';
import { createLogger, format, transports } from 'winston';
import { ILogger } from './ILogger';

if (!fs.existsSync('reports')) {
    fs.mkdirSync('reports', { recursive: true });
}

export class WinstonLogger implements ILogger {
    private readonly logger = createLogger({
        level: process.env.LOG_LEVEL || 'info',

        format: format.combine(
            format.timestamp({
                format: 'YYYY-MM-DD HH:mm:ss',
            }),
            format.errors({ stack: true }),
            format.printf(({ timestamp, level, message, stack }) => {
                return stack
                    ? `[${timestamp}] ${level.toUpperCase()} : ${message}\n${stack}`
                    : `[${timestamp}] ${level.toUpperCase()} : ${message}`;
            }),
        ),

        transports: [
            new transports.Console({
                format: format.combine(
                    format.colorize(),
                    format.timestamp({
                        format: 'YYYY-MM-DD HH:mm:ss',
                    }),
                    format.printf(({ timestamp, level, message }) => {
                        return `[${timestamp}] ${level} : ${message}`;
                    }),
                ),
            }),

            new transports.File({
                filename: 'reports/framework.log',
            }),
        ],

        exceptionHandlers: [
            new transports.File({
                filename: 'reports/exceptions.log',
            }),
        ],

        rejectionHandlers: [
            new transports.File({
                filename: 'reports/rejections.log',
            }),
        ],
    });

    public info(message: string): void {
        this.logger.info(message);
    }

    public warn(message: string): void {
        this.logger.warn(message);
    }

    public debug(message: string): void {
        this.logger.debug(message);
    }

    public error(message: string, error?: Error): void {
        if (error) {
            this.logger.error(message, error);
        } else {
            this.logger.error(message);
        }
    }
}
