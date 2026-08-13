import { IWorldOptions, World, setWorldConstructor } from '@cucumber/cucumber';
import { Browser, BrowserContext, Page } from '@playwright/test';

import { LoginPage } from '../../business/pages/loginPage';
import { LaunchesPage } from '../../business/pages/launchesPage';
import { Config } from 'src/core/config';
import { Pages } from './pages';
import { ScenarioContext } from './scenarioContext';

export class CustomWorld extends World {
    config!: Config;    
    browser!: Browser;
    context!: BrowserContext;
    page!: Page;
    pages!: Pages;

    loginPage!: LoginPage;
    launchesPage!: LaunchesPage;
    readonly scenarioContext: ScenarioContext;

    constructor(options: IWorldOptions) {
        super(options);
        this.scenarioContext = new ScenarioContext();
    }
}

setWorldConstructor(CustomWorld);
