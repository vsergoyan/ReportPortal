import { Locator } from '@playwright/test';
import { BaseComponent } from './baseComponent';

export class DeleteLaunchModal extends BaseComponent {
    readonly deleteButton: Locator;

    constructor(root: Locator) {
        super(root);
        this.deleteButton = root.getByRole('button', { name: 'Delete' });
    }
}
