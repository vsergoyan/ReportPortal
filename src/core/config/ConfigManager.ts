import * as dotenv from 'dotenv';
import { Config } from './Config';

export class ConfigManager {
    static load(environment: string): Config {
        dotenv.config({
            path: `.env.${environment}`
        });

        return {
            baseUrl: process.env.BASE_URL || '',
            reportPortalEndpoint: process.env.RP_ENDPOINT || '',
            reportPortalProject: process.env.RP_PROJECT || '',
            reportPortalApiKey: process.env.RP_API_KEY || '',
            username: process.env.RP_USERNAME || '',
            password: process.env.RP_PASSWORD || '',
            environment,
        };
    }
}
