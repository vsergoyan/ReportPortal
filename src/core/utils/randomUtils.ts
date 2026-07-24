export class RandomUtils {
    static string(length = 10): string {
        const chars =
            'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

        return Array.from({ length }, () =>
            chars.charAt(Math.floor(Math.random() * chars.length))
        ).join('');
    }

    static email(): string {
        return `user_${Date.now()}@example.com`;
    }

    static number(min = 1, max = 1000): number {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    static uuid(): string {
        return crypto.randomUUID();
    }
}
