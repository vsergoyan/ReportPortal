import { Locator, Page } from '@playwright/test';
import { BasePage } from './basePage';
import { DeleteLaunchModal } from '../components/deleteLaunchModal';
import { CompareLaunchesModal } from '../components/compareLaunchModal';
import { API_PATHS } from '../constants';

export class LaunchesPage extends BasePage {
    readonly launches: Locator;
    readonly actionsButton: Locator;
    readonly deleteMenuItem: Locator;
    readonly deleteLaunchModal: DeleteLaunchModal;
    readonly compareMenuItem: Locator;
    readonly compareLaunchesModal: CompareLaunchesModal;
    readonly breadcrumbItems: Locator;

    constructor(page: Page) {
        super(page);
        this.launches = this.page.locator('div[data-id]');
        this.actionsButton = page.locator('div[class*="ghostMenuButton"] i[class*="toggle-icon"]');
        this.deleteMenuItem = page.locator('//div[contains(@class, "menu-item")]/span[text()="Delete"]');
        this.deleteLaunchModal = new DeleteLaunchModal(
            page.locator('//div[contains(@class,"modal-window")][.//span[text()="Delete launch"]]')
        );   
        this.compareMenuItem = page.locator('//div[contains(@class, "menu-item")]/span[text()="Compare"]');
        this.compareLaunchesModal = new CompareLaunchesModal(
            page.locator('//div[contains(@class,"modal-window")][.//span[text()="Compare launches"]]')
        );
        this.breadcrumbItems = this.page.locator('span[class*="breadcrumb__link-item"]');
    }

    getLaunchLocatorByIndex (index: number): Locator {
        return this.page.locator(`div[data-id]:nth-child(${index + 1})`);
    }

    getCheckIconLocatorByIndex(index: number): Locator {
        return this.getLaunchLocatorByIndex(index).locator('div[class*="checkIcon"]');
    }

    getLaunchNameLocatorByIndex(index: number): Locator {
        return this.getLaunchLocatorByIndex(index).locator('td[class*="name-col"] div[class*="itemInfo__main-info"]');
    }

    async getLaunchName(index: number): Promise<string> {
        return this.getText(this.getLaunchNameLocatorByIndex(index));
    }

    async open() {
        await this.navigate(`/#${this.config.reportPortalProject}/launches`);
    }

    async deleteLaunchByOrder(i: number): Promise<void> {
        await this.getCheckIconLocatorByIndex(i).click();
        await this.actionsButton.click();
        await this.deleteMenuItem.click();

        await Promise.all([
            this.page.waitForResponse(response =>
                response.request().method() === 'DELETE' &&
                response.url().includes('/launch') &&
                response.status() === 200
            ),
            this.deleteLaunchModal.deleteButton.click(),
        ]);
    }

    async getLastBreadcrumbText(): Promise<string> {
        return (await this.breadcrumbItems.last().textContent())?.trim() ?? '';
    }

    async openLaunchByIndex(index: number): Promise<void> {
        const launchPath = API_PATHS.launch.replace(
            '{project}',
            this.config.reportPortalProject.toLocaleLowerCase()
        );
        await Promise.all([
            this.page.waitForResponse(response =>
                response.request().method() === 'GET' &&
                response.url().includes(launchPath) &&
                response.status() === 200
            ),
            this.getLaunchNameLocatorByIndex(index).click(),
        ]);
    }
}
