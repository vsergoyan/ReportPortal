import { Locator, Page } from '@playwright/test';
import { BasePage } from './basePage';

export class LoginPage extends BasePage {
    readonly loginButton: Locator;
    readonly usernameInput: Locator;
    readonly passwordInput: Locator;

    constructor(page: Page) {
        super(page);
        this.loginButton = page.locator('//button[text()="Login"]');
        this.usernameInput = page.locator('input[name="login"]');
        this.passwordInput = page.locator('input[name="password"]');
    }

    async open() {
        await this.navigate('/');
    }

    async login(username: string, password: string) {
        await this.usernameInput.fill(username);
        await this.passwordInput.fill(password);
        await this.loginButton.click();
    }
}
