import { Locator, Page } from '@playwright/test';
import { BasePage } from './basePage';

export class LoginPage extends BasePage {
    readonly loginButton: Locator;

    constructor(page: Page) {
        super(page);
        this.loginButton = page.locator('button[type="submit"]');
    }

    async open() {
        await this.page.goto(this.config.baseUrl);
    }
}
