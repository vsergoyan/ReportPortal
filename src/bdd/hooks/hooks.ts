import {
    BeforeAll,
    AfterAll,
    Before,
    After,
} from '@cucumber/cucumber';
import { setDefaultTimeout } from '@cucumber/cucumber';

setDefaultTimeout(30_000);

import { chromium, Browser } from '@playwright/test';
import dotenv from 'dotenv';

import { CustomWorld } from '../context/customWorld';
import { LoginPage } from '../../business/pages/loginPage';
import { LaunchesPage } from '../../business/pages/launchesPage';
import { ConfigurationService } from '../../core/config/ConfigurationService';
import { Pages } from '../context/pages';

dotenv.config({
    path: `.env.${process.env.TEST_ENV}`,
});

let browser: Browser;

BeforeAll(async () => {
    browser = await chromium.launch({
        headless: process.env.HEADLESS !== 'false',
    });
});

AfterAll(async () => {
    await browser.close();
});

Before(async function (this: CustomWorld) {
    this.browser = browser;
    this.config = ConfigurationService.getConfig();

    this.context = await browser.newContext({
        baseURL: process.env.BASE_URL,
    });
    this.page = await this.context.newPage();
    this.pages = new Pages(this.page);
    this.loginPage = new LoginPage(this.page);
    this.launchesPage = new LaunchesPage(this.page);
});

After(async function (this: CustomWorld) {
    await this.context.close();
});
