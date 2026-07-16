import { test as base } from '@playwright/test';
import { LoginPage } from '../business/pages';
import { logger } from '../core/logger';

type Fixtures = {
    loginPage: LoginPage;
};

export const test = base.extend<Fixtures>({
    loginPage: async ({ page }, use) => {
        await use(new LoginPage(page));
    },
});

export { expect } from '@playwright/test';
export { logger };
