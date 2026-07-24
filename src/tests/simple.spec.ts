import { test, logger, expect } from '../fixtures';

test('ReportPortal login page opens', async ({ loginPage }) => {
    logger.info('Opening RP');
    await loginPage.open();
    await expect(loginPage.loginButton).toBeVisible();
});
