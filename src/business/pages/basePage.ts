import { Locator, Page } from '@playwright/test';
import { ConfigurationService } from '../../core/config';

export abstract class BasePage {
    protected readonly config = ConfigurationService.getConfig();    
    readonly locatorForNotificationMessage: Locator;
    
    constructor(protected readonly page: Page) {
        this.locatorForNotificationMessage = page.locator("div[class*='notificationList'] h2");
    }

    async navigate(url: string): Promise<void> {
        await this.page.goto(url);
    }
    
    async getText(locator: Locator): Promise<string> {
        return (await locator.textContent()) ?? '';
    }
}
