export class DateUtils {
    static today(): string {
        return new Date().toISOString().split('T')[0];
    }

    static now(): string {
        return new Date().toISOString();
    }

    static addDays(days: number): Date {
        const date = new Date();
        date.setDate(date.getDate() + days);
        return date;
    }

    static timestamp(): number {
        return Date.now();
    }

    static convertToTimestamp(value: string): number {
        return new Date(value.replace(' ', 'T')).getTime();
    }

    static normalizeToSeconds(timestamp: number): number {
        return Math.floor(timestamp / 1000) * 1000;
    }
}
