import { Locator, Page } from '@playwright/test';
import { BasePage } from './basePage';

export class LoginPage extends BasePage {
    readonly loginButton: Locator;

    constructor(page: Page) {
        super(page);
        this.loginButton = page.locator('//button[text()="Login"]');
    }

    async open() {
        await this.navigate('/');
    }
}
