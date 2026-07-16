import { test, logger } from '../fixtures';

test('ReportPortal login page opens', async ({ loginPage }) => {
    logger.info('Opening RP');
    await loginPage.open();
    await loginPage.expectVisible(loginPage.loginButton);
});