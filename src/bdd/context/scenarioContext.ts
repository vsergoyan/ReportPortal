export class ScenarioContext {
    private readonly values = new Map<string, unknown>();

    remember<T>(key: string, value: T): void {
        this.values.set(key, value);
    }

    recall<T>(key: string): T {
        const value = this.values.get(key);
        if (value === undefined) {
            throw new Error(`No value remembered with key "${key}".`);
        }
        return value as T;
    }

    clear(): void {
        this.values.clear();
    }
}
