export interface ApiRequestOptions {
    headers?: Record<string, string>;
    data?: unknown;
    params?: Record<string, string | number>;
}
