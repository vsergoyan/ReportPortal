import { describe, it } from 'mocha';
import { LoginPage } from '../../business/pages/loginPage';
import { page, config } from './hooks';
import { expect } from '@playwright/test';
import { userInfo, messages } from '../../business/constants';

describe('ReportPortal Login', () => {
    it('Should be able to login with right credentials', async () => {
        const loginPage = new LoginPage(page);
        await loginPage.open();
        await loginPage.login(config.username, config.password);
        await expect(loginPage.locatorForNotificationMessage).toContainText(messages.successfullLogin);
    });

    it('Should be able to see error message with wrong credentials', async () => {
        const loginPage = new LoginPage(page);
        await loginPage.open();
        await loginPage.login(userInfo.invalid.username,userInfo.invalid.password);
        await expect(loginPage.locatorForNotificationMessage).toContainText(messages.badCredentials);
    });
});
