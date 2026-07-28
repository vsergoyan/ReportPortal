import { expect, Locator } from '@playwright/test';

export abstract class BaseComponent {
    constructor(protected readonly root: Locator) {}

    async expectVisible(): Promise<void> {
        await expect(this.root).toBeVisible();
    }

    async expectHidden(): Promise<void> {
        await expect(this.root).toBeHidden();
    }

    async isVisible(): Promise<boolean> {
        return this.root.isVisible();
    }

    async waitForVisible(): Promise<void> {
        await this.root.waitFor({ state: 'visible' });
    }

    async waitForHidden(): Promise<void> {
        await this.root.waitFor({ state: 'hidden' });
    }
}
