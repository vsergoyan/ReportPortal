import { Config } from '../../core/config/Config';

export interface Authenticator {
    getHeaders(): Record<string, string>;
}

export class ReportPortalAuthenticator implements Authenticator {
    constructor(private readonly config: Config) {}

    getHeaders(): Record<string, string> {
        return {
            Authorization: `bearer ${this.config.reportPortalApiKey}`,
        };
    }
}
