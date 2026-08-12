import { Locator } from '@playwright/test';
import { BaseComponent } from './baseComponent';

export class CompareLaunchesModal extends BaseComponent {
    readonly cancelButton: Locator;

    constructor(root: Locator) {
        super(root);
        this.cancelButton = root.getByRole('button', { name: 'Cancel' });
    }
}
