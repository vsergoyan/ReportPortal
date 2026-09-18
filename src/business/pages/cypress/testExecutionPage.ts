import { CypressElement } from '../../../core/ui/cypress/CypressElement';


export class CypressTestExecutionPage {
    public readonly button = new CypressElement('button');

    public open(): void {
        const project = Cypress.expose('RP_PROJECT');
        cy.visit(`/#${project}/plugin/testExecution`);
    }

    public getCustomizeColumnsButton(): CypressElement {
        return this.button.contains('Customize Columns');
    }

    public getDragControlByIndex(index: number): CypressElement {
        return new CypressElement(
            `span[class*='drag-control']:eq(${index - 1})`,
        );
    }

    public getColumnNameByIndex(index: number): CypressElement {
        return new CypressElement(
            `div[class*='draggable-rule-item']:nth-child(${index}) span[class*='draggable-rule-item-name']`,
        );
    }
}
