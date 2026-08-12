import { expect, Locator, Page } from '@playwright/test';
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

    async waitForTimeout(timeoutMs: number) {
        this.page.waitForTimeout(timeoutMs);
    }
    
    protected getElement(path: string): Locator {
        const parts = path
            .split('>')
            .map(part => part.trim())
            .filter(Boolean);
        let current: any = this;
        for (let i = 0; i < parts.length; i++) {
            const part = parts[i];
            if (i === 0 && part.toLowerCase().endsWith('page')) {
                continue;
            }
            const property = this.toPropertyName(part);
            current = current[property];
            if (!current) {
                throw new Error(
                    `Cannot resolve "${part}" (property "${property}") on ${this.constructor.name}`
                );
            }
        }
        if (typeof current?.getLocator === 'function') {
            return current.getLocator();
        }
        return current as Locator;
    }

    protected toPropertyName(text: string): string {
        return text
            .toLowerCase()
            .split(/\s+/)
            .map((word, index) =>
                index === 0
                    ? word
                    : word.charAt(0).toUpperCase() + word.slice(1)
            )
            .join('');
    }

    async clickElement(path: string): Promise<void> {
        await this.getElement(path).click();
    }

    async waitUntilVisible(path: string, timeout = 5000): Promise<void> {
        await expect(this.getElement(path)).toBeVisible({ timeout });
    }

    async waitUntilHidden(path: string, timeout = 5000): Promise<void> {
        await expect(this.getElement(path)).toBeHidden({ timeout });
    }
}
