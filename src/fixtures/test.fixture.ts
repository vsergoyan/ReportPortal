import { test as base } from '@playwright/test';
import { LoginPage, LaunchesPage } from '../business/pages';
import { logger } from '../core/logger';

type Fixtures = {
    loginPage: LoginPage;
    launchesPage: LaunchesPage;
};

export const test = base.extend<Fixtures>({
    loginPage: async ({ page }, use) => {
        await use(new LoginPage(page));
    },
    launchesPage: async ({ page }, use) => {
        await use(new LaunchesPage(page));
    }
});

export { expect } from '@playwright/test';
export { logger };
