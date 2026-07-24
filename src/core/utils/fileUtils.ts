import fs from 'fs';

export class FileUtils {
    static exists(path: string): boolean {
        return fs.existsSync(path);
    }

    static read(path: string): string {
        return fs.readFileSync(path, 'utf8');
    }

    static write(path: string, data: string): void {
        fs.writeFileSync(path, data);
    }

    static readJson<T>(path: string): T {
        return JSON.parse(this.read(path));
    }
}
