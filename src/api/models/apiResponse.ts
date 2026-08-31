export interface ApiResponse {
    status(): number;
    statusText(): string;
    json<T = unknown>(): Promise<T>;
}
