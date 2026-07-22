import { Config } from './Config';

export class ConfigManager {
    static load(environment: string): Config {
        return {
            reportPortalEndpoint: process.env.RP_ENDPOINT || '',
            reportPortalProject: process.env.RP_PROJECT || '',
            reportPortalApiKey: process.env.RP_API_KEY || '',
            username: process.env.RP_USERNAME || '',
            password: process.env.RP_PASSWORD || '',
            environment,
        };
    }
}
