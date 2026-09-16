export interface IJsExecutor {
    dragAndDrop(sourceSelector: string, targetSelector: string): void;
    resize(selector: string, width: number, height: number): void;
    scrollToElement(selector: string): void;
    isScrolledIntoView(selector: string): Promise<boolean>;
    click(selector: string): void;
    hover(selector: string): void;
}
