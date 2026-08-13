import { expect } from '@playwright/test';
import { userInfo, messages } from '../../business/constants';
import { test } from '../../fixtures/test.fixture';

test.describe('ReportPortal Login', () => {
    test('Should be able to login with right credentials', async ({ loginPage }) => {
        await loginPage.open();
        await loginPage.login(process.env.RP_USERNAME!, process.env.RP_PASSWORD!);
        await expect(loginPage.locatorForNotificationMessage).toContainText(messages.successfullLogin);
    });

    test('Should be able to see error message with wrong credentials', async ({ loginPage }) => {
        await loginPage.open();
        await loginPage.login(userInfo.invalid.username, userInfo.invalid.password);
        await expect(loginPage.locatorForNotificationMessage).toContainText(messages.badCredentials);
    });
});
