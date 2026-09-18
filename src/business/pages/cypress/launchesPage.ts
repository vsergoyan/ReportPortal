import { CypressElement } from '../../../core/ui/cypress/CypressElement';
import { CypressJsExecutor } from '../../../core/ui/cypress/CypressJsExecutor';


export class CypressLaunchesPage {
    public readonly launches = new CypressElement('div[data-id]');
    public readonly startTimeHeader = new CypressElement(
        'div[class*="sorting-desc"] div[class*="headerCell__title-container"]',
    );
    public readonly actionsButton = new CypressElement(
        'div[class*="ghostMenuButton"] i[class*="toggle-icon"]',
    );
    public readonly menuItem = new CypressElement(
        'div[class*="menu-item"] span',
    );
    public readonly button = new CypressElement(
        'button',
    );
    public readonly modal = new CypressElement(
        'div[class*="modal-window"]',
    );
    public readonly launch = new CypressElement('div[data-id]');
    public readonly breadcrumbItems = new CypressElement(
        'span[class*="breadcrumb__link-item"]',
    );

    public open(): void {
        const project = Cypress.expose('RP_PROJECT');
        cy.visit(`/#${project}/launches`);
    }

    public getLaunchLocatorByIndex(index: number): CypressElement {
        return new CypressElement(
            `div[data-id]:nth-child(${index + 1})`,
        );
    }

    public getLaunchByName(name: string): CypressElement {
        return this.launch.contains(name);
    }

    public getCheckIconLocatorByIndex(index: number): CypressElement {
        return new CypressElement(
            `div[data-id]:nth-child(${index + 1}) div[class*="checkIcon"]`,
        );
    }

    public getLaunchNameByIndex(index: number): CypressElement {
        return new CypressElement(
            `div[data-id]:nth-child(${index + 1}) td[class*="name-col"] div[class*="itemInfo__main-info"]`,
        );
    }

    public getLaunchStartTimeByIndex(index: number): CypressElement {
        return new CypressElement(
            `div[data-id]:nth-child(${index + 1}) div[class*="start-time-col"] span[class*="absolute-time"]`,
        );
    }

    public getLaunchStartTimes(): Promise<string[]> {
        return new Promise((resolve) => {
            cy.get('div[data-id] div[class*="start-time-col"] span[class*="absolute-time"]')
                .then(($elements) => {
                    const startTimes = $elements.toArray().map(
                        (element) => element.textContent?.trim() ?? '',
                    );
                    resolve(startTimes);
                });
        });
    }

    public sortByStartTime(): void {
        const jsExecutor = new CypressJsExecutor();
        jsExecutor.click(this.startTimeHeader.getSelector());
    }

    public getExecutionStatisticByIndex(
        index: number,
        column: string,
    ): CypressElement {
        return new CypressElement(
            `div[data-id]:nth-child(${index + 1}) div[class*="${column}"] a[class*="executionStatistics__value"]`,
        );
    }

    public getDefectStatisticByIndex(
        index: number,
        column: string,
    ): CypressElement {
        return new CypressElement(
            `div[data-id]:nth-child(${index + 1}) div[class*="${column}"] div[class*="donutChart__total"]`,
        );
    }

    public getMenuItemByText(text: string): CypressElement {
        return this.menuItem.contains(text);
    }

    public getButtonByText(text: string): CypressElement {
        return this.button.contains(text);
    }

    public getCompareLaunchesModal(): CypressElement {
        return this.modal.contains('Compare launches');
    }

    public selectLaunchByName(name: string): void {
        const launch = this.getLaunchByName(name);
        launch.waitForVisible();
        launch.find('div[class*="checkIcon"]').click();
    }

    public getLastBreadcrumbText(): Promise<string | null> {
        return this.breadcrumbItems.last().textContent();
    }

    public openLaunchByIndex(index: number): void {
        cy.intercept('GET', '**/launch/**').as('getLaunch');
        const jsExecutor = new CypressJsExecutor();

        const launch = this.getLaunchNameByIndex(index);
        const selector = launch.getSelector();
        jsExecutor.scrollToElement(selector);
        void jsExecutor.isScrolledIntoView(selector).then((isScrolled) => {
            expect(isScrolled).to.equal(true);
            launch.click();

            cy.wait('@getLaunch')
                .its('response.statusCode')
                .should('eq', 200);
        });
    }
}
