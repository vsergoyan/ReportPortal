import { ILogger } from './ILogger';
import { WinstonLogger } from './WinstonLogger';

export class LoggerFactory {
    private static logger: ILogger;

    public static getLogger(): ILogger {
        if (!this.logger) {
            this.logger = new WinstonLogger();
        }

        return this.logger;
    }
}
