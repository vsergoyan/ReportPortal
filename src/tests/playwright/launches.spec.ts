import { expect } from '@playwright/test';
import { ConfigurationService } from '../../core/config';
import { StringUtils } from '../../core/utils/stringUtils';
import { test } from '../../fixtures/test.fixture';
import { messages } from '../../business/constants';
import { jiraTest } from '../../integrations/jira/jiraTest';

const config = ConfigurationService.getConfig();

test.describe('ReportPortal Launches', () => {
    test.beforeEach(async ({ loginPage, launchesPage }) => {
        await loginPage.open();
        await loginPage.login(config.username, config.password);
        await expect(loginPage.locatorForNotificationMessage).toContainText(messages.successfullLogin);
        await launchesPage.open();
    });

    test('Should be able to delete launch',
        jiraTest('EPMCRWC-4'),
        async ({ launchesPage }) => {
        await launchesPage.getLaunchNameLocatorByIndex(1).waitFor({state: 'visible'});
        const launchesCountBeforeDelete = await launchesPage.launches.count();
        const lastLaunchNameBeforeDelete = await launchesPage.getLaunchName(launchesCountBeforeDelete);
        await launchesPage.deleteLaunchByOrder(launchesCountBeforeDelete);

        await launchesPage.getLaunchNameLocatorByIndex(1).waitFor({state: 'visible'});
        const launchesCountAfterDelete = await launchesPage.launches.count();
        const lastLaunchNameAfterDelete = await launchesPage.getLaunchName(launchesCountAfterDelete);
        expect(lastLaunchNameAfterDelete).not.toBe(lastLaunchNameBeforeDelete);
    });

    test('Should be able to compare launches',
        jiraTest('EPMCRWC-5'),
        async ({ launchesPage }) => {
        const LAUNCHES_TO_COMPARE = 2;
        for (let i = 1; i <= LAUNCHES_TO_COMPARE; i++) {
            await launchesPage.getCheckIconLocatorByIndex(i).click();
        }
        await launchesPage.actionsButton.click();
        await launchesPage.compareMenuItem.click();
        await launchesPage.compareLaunchesModal.expectVisible();
        await launchesPage.compareLaunchesModal.cancelButton.click();
        await launchesPage.compareLaunchesModal.expectHidden();
    });

    test('Should be able to move to appropriate launch view clicking on Launch name',
        jiraTest('EPMCRWC-6'),
        async ({ launchesPage }) => {
        const firstLaunchName = await launchesPage.getLaunchName(1);
        await launchesPage.openLaunchByIndex(1);
        const lastBreadcrumbText = await launchesPage.getLastBreadcrumbText();
        expect(
            StringUtils.removeWhitespace(lastBreadcrumbText)
        ).toBe(
            StringUtils.removeWhitespace(firstLaunchName)
        );
    });
});
