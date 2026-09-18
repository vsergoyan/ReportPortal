import { IWebElement } from '../interfaces/IWebElement';

export class CypressElement implements IWebElement {
    constructor(private readonly selector: string) {}

    public click(): void {
        cy.get(this.selector).click();
    }

    public hover(): void {
        cy.get(this.selector).trigger('mouseover');
    }

    public fill(value: string): void {
        cy.get(this.selector).clear().type(value);
    }

    public isVisible(): Promise<boolean> {
        return new Promise((resolve) => {
            cy.get(this.selector).then(($element) => {
                resolve($element.is(':visible'));
            });
        });
    }

    public textContent(): Promise<string | null> {
        return new Promise((resolve) => {
            cy.get(this.selector).then(($element) => {
                resolve($element.text() || null);
            });
        });
    }

    public contains(text: string): CypressElement {
        return new CypressElement(
            `${this.selector}:contains("${text}")`,
        );
    }

    public find(selector: string): CypressElement {
        return new CypressElement(`${this.selector} ${selector}`);
    }

    public waitForVisible(): void {
        cy.get(this.selector).should('be.visible');
    }

    public last(): CypressElement {
        return new CypressElement(`${this.selector}:last`);
    }

    public getSelector(): string {
        return this.selector;
    }
}
