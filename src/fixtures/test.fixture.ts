import { test as base } from '@playwright/test';
import { LoginPage, LaunchesPage } from '../business/pages';
import { logger } from '../core/logger';
import { ApiClient } from '../api/clients/apiClient';
import { PlaywrightApiClient } from '../api/clients/playwrightApiClient';
import { AxiosApiClient } from '../api/clients/axiosApiClient';
import { ReportPortalAuthenticator } from '../api/auth/apiAuthenticator';
import { ConfigurationService } from '../core/config/ConfigurationService';
import { LaunchesApi } from '../api/services/launchApi';
import { DashboardApi } from '../api/services/dashboardApi';

type Fixtures = {
    loginPage: LoginPage;
    launchesPage: LaunchesPage;
    apiClient: ApiClient;
    launchesApi: LaunchesApi;
    dashboardApi: DashboardApi;
    createdLaunch: {
        uuid: string;
    };
    createdDashboard: {
        id: number;
    };
};

export const test = base.extend<Fixtures>({
    loginPage: async ({ page }, use) => {
        await use(new LoginPage(page));
    },
    launchesPage: async ({ page }, use) => {
        await use(new LaunchesPage(page));
    },
    apiClient: async ({ request }, use) => {
        const config = ConfigurationService.getConfig();
        const authenticator = new ReportPortalAuthenticator(config);

        const apiClient =
            process.env.API_CLIENT === 'axios'
                ? new AxiosApiClient(config, authenticator)
                : new PlaywrightApiClient(
                    request,
                    config,
                    authenticator,
                );

        await use(apiClient);
    },
    launchesApi: async ({ apiClient }, use) => {
        const config = ConfigurationService.getConfig();
        await use(
            new LaunchesApi(
                apiClient,
                config.reportPortalProject,
            ),
        );
    },
    dashboardApi: async ({ apiClient }, use) => {
        const config = ConfigurationService.getConfig();
        await use(
            new DashboardApi(
                apiClient,
                config.reportPortalProject,
            ),
        );
    },
    createdDashboard: async ({ page }, use) => {
        void page;
        await use({ id: 0 });
    },

    createdLaunch: async ({ page }, use) => {
        void page;
        await use({ uuid: '' });
    },
});

export { expect } from '@playwright/test';
export { logger };
