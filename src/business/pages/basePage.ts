import { expect, Locator, Page } from '@playwright/test';
import { ConfigurationService } from '../../core/config';

export abstract class BasePage {
    protected readonly config = ConfigurationService.getConfig();    
    constructor(protected readonly page: Page) {}

    async navigate(url: string): Promise<void> {
        await this.page.goto(url);
    }

    async click(locator: Locator): Promise<void> {
        await locator.click();
    }

    async fill(locator: Locator, value: string): Promise<void> {
        await locator.fill(value);
    }

    async getText(locator: Locator): Promise<string> {
        return (await locator.textContent()) ?? '';
    }

    async isVisible(locator: Locator): Promise<boolean> {
        return locator.isVisible();
    }

    async expectVisible(locator: Locator): Promise<void> {
        await expect(locator).toBeVisible();
    }
}
