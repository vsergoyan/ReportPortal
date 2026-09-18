import { IJsExecutor } from '../interfaces/IJsExecutor';

export class CypressJsExecutor implements IJsExecutor {
    public scrollToElement(selector: string): void {
        cy.get(selector).then(($element) => {
            $element[0].scrollIntoView({
                behavior: 'instant',
                block: 'center',
                inline: 'center',
            });
        });
    }

    public isScrolledIntoView(selector: string): Promise<boolean> {
        return new Promise((resolve) => {
            cy.get(selector).then(($element) => {
                const rect = $element[0].getBoundingClientRect();

                const viewportHeight = Cypress.config('viewportHeight');
                const viewportWidth = Cypress.config('viewportWidth');

                const isVisible =
                    rect.top >= 0 &&
                    rect.left >= 0 &&
                    rect.bottom <= viewportHeight &&
                    rect.right <= viewportWidth;

                resolve(isVisible);
            });
        });
    }

    public dragAndDrop(
        sourceSelector: string,
        targetSelector: string,
    ): void {
        cy.get(sourceSelector).then(($source) => {
            cy.get(targetSelector).then(($target) => {
                const dataTransfer = new DataTransfer();
                const dragEventOptions = {
                    bubbles: true,
                    cancelable: true,
                    dataTransfer,
                };

                $source[0].dispatchEvent(
                    new DragEvent('dragstart', dragEventOptions),
                );

                $target[0].dispatchEvent(
                    new DragEvent('dragover', dragEventOptions),
                );

                $target[0].dispatchEvent(
                    new DragEvent('drop', dragEventOptions),
                );

                $source[0].dispatchEvent(
                    new DragEvent('dragend', dragEventOptions),
                );
            });
        });
    }

    public resize(
        selector: string,
        width: number,
        height: number,
    ): void {
        cy.get(selector).then(($element) => {
            $element[0].style.width = `${width}px`;
            $element[0].style.height = `${height}px`;
        });
    }

    public click(selector: string): void {
        cy.get(selector).then(($element) => {
            $element[0].click();
        });
    }

    public hover(selector: string): void {
        cy.get(selector).then(($element) => {
            $element[0].dispatchEvent(
                new MouseEvent('mouseover', {
                    bubbles: true,
                    cancelable: true,
                    view: $element[0].ownerDocument.defaultView,
                }),
            );
        });
    }
}
