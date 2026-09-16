import { CypressElement } from '../../../core/ui/cypress/CypressElement';

export class CypressLoginPage {
    private readonly usernameInput = new CypressElement('input[name="login"]');
    private readonly passwordInput = new CypressElement('input[name="password"]');
    private readonly loginButton = new CypressElement('button[type="submit"]');

    public open(): void {
        cy.visit('/#login');
    }

    public login(): void {
        cy.env(['RP_USERNAME', 'RP_PASSWORD']).then((env) => {
            this.usernameInput.fill(String(env.RP_USERNAME));
            this.passwordInput.fill(String(env.RP_PASSWORD));
            this.loginButton.click();
        });
    }
}
