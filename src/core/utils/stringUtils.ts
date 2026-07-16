export class StringUtils {
    static capitalize(text: string): string {
        return text.charAt(0).toUpperCase() + text.slice(1);
    }

    static containsIgnoreCase(text: string, search: string): boolean {
        return text.toLowerCase().includes(search.toLowerCase());
    }

    static removeWhitespace(text: string): string {
        return text.replace(/\s+/g, '');
    }
}
