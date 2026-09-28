import { expect } from '@playwright/test';
import { userInfo, messages } from '../../business/constants';
import { test } from '../../fixtures/test.fixture';
import { jiraTest } from '../../integrations/jira/jiraTest';

test.describe('ReportPortal Login', () => {
    test('Should be able to login with right credentials',
        jiraTest('EPMCRWC-2'),
        async ({ loginPage }) => {
        await loginPage.open();
        await loginPage.login(process.env.RP_USERNAME!, process.env.RP_PASSWORD!);
        await expect(loginPage.locatorForNotificationMessage).toContainText(messages.successfullLogin);
    });

    test('Should be able to see error message with wrong credentials',
        jiraTest('EPMCRWC-3'),
        async ({ loginPage }) => {
        await loginPage.open();
        await loginPage.login(userInfo.invalid.username, userInfo.invalid.password);
        await expect(loginPage.locatorForNotificationMessage).toContainText(messages.badCredentials);
    });
});
