import { Page } from '@playwright/test';
import { LaunchesPage } from '../../business/pages/launchesPage';
import { LoginPage } from '../../business/pages/loginPage';
import { BasePage } from '../../business/pages/basePage';

export class Pages {
    current!: BasePage;

    readonly login: LoginPage;
    readonly launches: LaunchesPage;
    
    constructor(page: Page) {
        this.login = new LoginPage(page);
        this.launches = new LaunchesPage(page);
    }

    async open(pageName: string) {
        switch (pageName) {
            case 'login':
                this.current = this.login;
                return this.login.open();

            case 'launches':
                this.current = this.launches;
                return this.launches.open();

            default:
                throw new Error(`Unknown page: ${pageName}`);
        }
    }
}
