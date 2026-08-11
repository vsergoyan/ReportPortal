import { Given, When, Then } from '@cucumber/cucumber';
import { CustomWorld } from '../context/customWorld';
import { expect } from '@playwright/test';

Given('User opens the {string} page',
    async function (this: CustomWorld, pageName: string) {
        await this.pages.open(pageName);
    }
);

Then(
    'Notification message should contain {string}',
    async function (this: CustomWorld, expectedMessage: string) {
        const actualText = await this.pages.current.getText(this.pages.current.locatorForNotificationMessage);
        expect(actualText).toBe(expectedMessage);
    }
);

When('User clicks the {string}',
    async function (this: CustomWorld, element: string) {
        await this.pages.current.clickElement(element);
    }
);

Then(
    /^"([^"]+)" should (not )?be visible$/,
    async function (
        this: CustomWorld,
        element: string,
        not: string | undefined
    ) {
        if (not) {
            await this.pages.current.waitUntilHidden(element);
        } else {
            await this.pages.current.waitUntilVisible(element);
        }
    }
);
