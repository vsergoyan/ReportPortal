import { before, after, beforeEach, afterEach } from 'mocha';
import { chromium, Browser, BrowserContext, Page } from '@playwright/test';
import { ConfigurationService } from '../../core/config';
import dotenv from 'dotenv';
dotenv.config({
    path: `.env.${process.env.TEST_ENV}`,
});

export const config = ConfigurationService.getConfig();
export let browser: Browser;
export let context: BrowserContext;
export let page: Page;

before(async () => {
    browser = await chromium.launch({
        headless: process.env.HEADLESS !== 'false',
    });
});

beforeEach(async () => {
    context = await browser.newContext({
        baseURL: process.env.BASE_URL,
    });
    page = await context.newPage();
});

afterEach(async () => {
    await context.close();
});

after(async () => {
    await browser.close();
});
