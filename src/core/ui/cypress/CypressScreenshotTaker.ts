import { IScreenshotTaker } from '../interfaces/IScreenshotTaker';

export class CypressScreenshotTaker implements IScreenshotTaker {
    public take(name: string): void {
        cy.screenshot(name);
    }
}
