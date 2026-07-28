import { describe, it } from 'mocha';
import { LoginPage } from '../../business/pages/loginPage';
import { LaunchesPage } from '../../business/pages/launchesPage';
import { page, config } from './hooks';
import { expect } from '@playwright/test';
import { StringUtils } from '../../core/utils/stringUtils';

describe('ReportPortal Launches', () => {
    let launchesPage: LaunchesPage;
    beforeEach(async () => {
        const loginPage = new LoginPage(page);
        await loginPage.open();
        await loginPage.login(config.username, config.password);
        await expect(loginPage.locatorForNotificationMessage).toContainText('Signed in successfully');

        launchesPage = new LaunchesPage(page);
        await launchesPage.open();
    });

    it('Should be able to delete launch', async () => {
        await launchesPage.getLaunchNameLocatorByIndex(1).waitFor({state: 'visible'});
        const launchesCountBeforeDelete = await launchesPage.launches.count();
        const lastLaunchNameBeforeDelete = await launchesPage.getLaunchName(launchesCountBeforeDelete);
        await launchesPage.deleteLaunchByOrder(launchesCountBeforeDelete);

        await launchesPage.getLaunchNameLocatorByIndex(1).waitFor({state: 'visible'});
        const launchesCountAfterDelete = await launchesPage.launches.count();
        const lastLaunchNameAfterDelete = await launchesPage.getLaunchName(launchesCountAfterDelete);
        expect(lastLaunchNameAfterDelete).not.toBe(lastLaunchNameBeforeDelete);
    });

    it('Should be able to compare launches', async () => {
        for (let i = 1; i < 3; i++) {
            await launchesPage.getCheckIconLocatorByIndex(i).click();
        }
        await launchesPage.actionsButton.click();
        await launchesPage.compareMenuItem.click();
        await launchesPage.compareLaunchesModal.waitForVisible();
        await launchesPage.compareLaunchesModal.expectVisible();
        await launchesPage.compareLaunchesModal.cancelButton.click();
        await launchesPage.compareLaunchesModal.expectHidden();
    });

    it('Should be able to move to appropriate launch view clicking on Launch name', async () => {
        const firstLaunchName = await launchesPage.getLaunchName(1);
        await Promise.all([
            page.waitForResponse(response =>
                response.request().method() === 'GET' &&
                response.url().includes('/api/v1/vsergoyan_personal/launch/') &&
                response.status() === 200
            ),
            await launchesPage.getLaunchNameLocatorByIndex(1).click(),
        ]);
        const lastBreadcrumbText = await launchesPage.getLastBreadcrumbText();
        expect(
            StringUtils.removeWhitespace(lastBreadcrumbText)
        ).toBe(
            StringUtils.removeWhitespace(firstLaunchName)
        );    
    });
});
