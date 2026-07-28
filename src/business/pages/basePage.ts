import { Locator, Page } from '@playwright/test';
import { ConfigurationService } from '../../core/config';

export abstract class BasePage {
    protected readonly config = ConfigurationService.getConfig();    
    constructor(protected readonly page: Page) {}

    async navigate(url: string): Promise<void> {
        await this.page.goto(url);
    }
    
    async getText(locator: Locator): Promise<string> {
        return (await locator.textContent()) ?? '';
    }

    async waitForTimeout(timeoutMs: number) {
        this.page.waitForTimeout(timeoutMs);
    }
}
