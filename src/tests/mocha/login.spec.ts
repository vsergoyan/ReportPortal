import { describe, it } from 'mocha';
import { LoginPage } from '../../business/pages/loginPage';
import { page, config } from './hooks';
import { expect } from '@playwright/test';
import { userInfo } from '../../business/constants';

describe('ReportPortal Login', () => {
    it('Should be able to login with right credentials', async () => {
        const loginPage = new LoginPage(page);
        await loginPage.open();
        await loginPage.login(config.username, config.password);
        await expect(loginPage.locatorForNotificationMessage).toContainText('Signed in successfully');
    });

    it('Should be able to see error message with wrong credentials', async () => {
        const loginPage = new LoginPage(page);
        await loginPage.open();
        await loginPage.login(userInfo.invalid.username,userInfo.invalid.password);
        await expect(loginPage.locatorForNotificationMessage).toContainText('An error occurred while connecting to server: You do not have enough permissions. Bad credentials');
    });
});
