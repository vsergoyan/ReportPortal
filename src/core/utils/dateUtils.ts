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
}
