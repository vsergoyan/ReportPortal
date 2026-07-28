import { test, expect } from '@playwright/test';
import { LoginPage } from '../../business/pages/loginPage';
import { userInfo } from '../../business/constants';

test.describe('ReportPortal Login', () => {
    test('Should be able to login with right credentials', async ({ page }) => {
        const loginPage = new LoginPage(page);
        await loginPage.open();
        await loginPage.login(process.env.RP_USERNAME!, process.env.RP_PASSWORD!);
        await expect(loginPage.locatorForNotificationMessage).toContainText('Signed in successfully');
    });

    test('Should be able to see error message with wrong credentials', async ({ page }) => {
        const loginPage = new LoginPage(page);
        await loginPage.open();
        await loginPage.login(userInfo.invalid.username, userInfo.invalid.password);
        await expect(loginPage.locatorForNotificationMessage).toContainText(
            'An error occurred while connecting to server: You do not have enough permissions. Bad credentials',
        );
    });
});
