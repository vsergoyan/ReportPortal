import { Config } from './Config';
import { ConfigManager } from './ConfigManager';

export class ConfigurationService {
    private static config: Config;

    static getConfig(): Config {
        if (!this.config) {
            this.config = ConfigManager.load(
                process.env.TEST_ENV || 'local'
            );
        }

        return this.config;
    }
}
