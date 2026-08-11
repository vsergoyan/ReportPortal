import { When, Then, DataTable } from '@cucumber/cucumber';
import { CustomWorld } from '../context/customWorld';
import { expect } from '@playwright/test';
import { StringUtils } from '../../core/utils/stringUtils';

When(
    'User selects launches:',
    async function (this: CustomWorld, table: DataTable) {
        const launches = table.raw().flat().map(v => v.trim());
        for (const launch of launches) {
            const launchNumber =
                launch === 'last'
                    ? await this.pages.launches.launches.count()
                    : Number(launch);
            const locator =
                this.pages.launches.getCheckIconLocatorByIndex(launchNumber);
            await locator.waitFor({ state: 'visible' });
            await locator.click();
        }
    }
);

When(
    'User remembers the {string} launch name as {string}',
    async function (
        this: CustomWorld,
        launch: string,
        key: string
    ) {
        await this.pages.launches.getLaunchNameLocatorByIndex(1).waitFor({ state: 'visible' });
        const launchIndex =
            launch.toLowerCase() === 'last'
                ? await this.pages.launches.launches.count()
                : Number(launch);
        const launchName = await this.pages.launches.getLaunchName(launchIndex);
        this.scenarioContext.remember(key, launchName);
    }
);

When(
    'User clicks launch name number {int}',
    async function (this: CustomWorld, launchNumber: number) {
        await this.pages.launches.getLaunchNameLocatorByIndex(launchNumber).click();
    }
);

Then(
    /^Last breadcrumb should contain (remembered )?"([^"]+)"$/,
    async function (
        this: CustomWorld,
        remembered: string | undefined,
        value: string
    ) {
        const expected = StringUtils.removeWhitespace(remembered
            ? this.scenarioContext.recall<string>(value)
            : value
        );
        const actual = StringUtils.removeWhitespace(
            await this.pages.launches.getLastBreadcrumbText()
        );
        expect(expected).toBe(actual);
    }
);

Then(
    /^Launch list should not contain (remembered )?"([^"]+)"$/,
    async function (
        this: CustomWorld,
        remembered: string | undefined,
        value: string
    ) {
        await this.pages.launches.getLaunchNameLocatorByIndex(1).waitFor({ state: 'visible' });
        const launchName = remembered
            ? this.scenarioContext.recall<string>(value)
            : value;

        await expect(
            this.pages.launches.launches.filter({ hasText: launchName })
        ).toHaveCount(0);
    }
);
