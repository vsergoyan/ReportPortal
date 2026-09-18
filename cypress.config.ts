import { defineConfig } from 'cypress';
import dotenv from 'dotenv';
import { logger } from './src/core/logger';
import { CreateLaunchResponse } from './src/api/models/launchResponses';
import { LaunchStatus } from './src/api/models/launchStatus';

dotenv.config({
    path: `.env.${process.env.TEST_ENV || 'web'}`,
});

export default defineConfig({
    e2e: {
        baseUrl: process.env.BASE_URL,
        env: {
            RP_USERNAME: process.env.RP_USERNAME,
            RP_PASSWORD: process.env.RP_PASSWORD,
        },
        expose: {
            RP_PROJECT: process.env.RP_PROJECT,
        },
        defaultCommandTimeout: 10000,
        pageLoadTimeout: 30000,
        requestTimeout: 10000,
        responseTimeout: 30000,
        screenshotOnRunFailure: true,
        supportFile: false,

        setupNodeEvents(on, config) {
            on('before:spec', (spec) => {
                logger.info(`Starting Cypress spec: ${spec.name}`);
            });

            on('after:spec', (spec, results) => {
                if (results) {
                    logger.info(
                        `Finished Cypress spec: ${spec.name}. ` +
                        `Tests: ${results.tests.length}`,
                    );
                }
            });

            on('task', {
                async getLaunches() {
                    const { ConfigurationService } = await import('./src/core/config/index.js');
                    const { ReportPortalAuthenticator } = await import('./src/api/auth/apiAuthenticator.js');
                    const { AxiosApiClient } = await import('./src/api/clients/axiosApiClient.js');
                    const { LaunchesApi } = await import('./src/api/services/launchApi.js');
                    const appConfig = ConfigurationService.getConfig();
                    const authenticator = new ReportPortalAuthenticator(appConfig);
                    const apiClient = new AxiosApiClient(appConfig, authenticator);
                    const launchesApi = new LaunchesApi(apiClient, appConfig.reportPortalProject);
                    const response = await launchesApi.getLaunches();
                    return response.json();
                },
            });

            on('task', {
                async createAndFinishLaunch(name: string) {
                    const { ConfigurationService } = await import('./src/core/config/index.js');
                    const { ReportPortalAuthenticator } = await import('./src/api/auth/apiAuthenticator.js');
                    const { AxiosApiClient } = await import('./src/api/clients/axiosApiClient.js');
                    const { LaunchesApi } = await import('./src/api/services/launchApi.js');

                    const appConfig = ConfigurationService.getConfig();
                    const authenticator = new ReportPortalAuthenticator(appConfig);
                    const apiClient = new AxiosApiClient(appConfig, authenticator);
                    const launchesApi = new LaunchesApi(apiClient, appConfig.reportPortalProject);
                    const startTime = new Date().toISOString();
                    const createResponse = await launchesApi.createLaunch({
                        startTime: startTime,
                        name,
                    });
                    const createdLaunchResponse: CreateLaunchResponse = await createResponse.json();
                    const finishResponse = await launchesApi.finishLaunch(createdLaunchResponse.id, LaunchStatus.PASSED);
                    await finishResponse.json();
                    return {
                        id: createdLaunchResponse.id,
                        name,
                        startTime,
                    };
                },
            });
            return config;
        },
    },
});
