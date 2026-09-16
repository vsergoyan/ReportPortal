export interface IWebElement {
    click(): void;
    hover(): void;
    fill(value: string): void;
    isVisible(): Promise<boolean>;
    textContent(): Promise<string | null>;
}
