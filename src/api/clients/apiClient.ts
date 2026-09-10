import { ApiRequestOptions } from '../models/apiRequest';
import { ApiResponse } from '../models/apiResponse';

export interface ApiClient {
    get(
        endpoint: string,
        options?: ApiRequestOptions,
    ): Promise<ApiResponse>;

    post(
        endpoint: string,
        options?: ApiRequestOptions,
    ): Promise<ApiResponse>;

    put(
        endpoint: string,
        options?: ApiRequestOptions,
    ): Promise<ApiResponse>;

    patch(
        endpoint: string,
        options?: ApiRequestOptions,
    ): Promise<ApiResponse>;

    delete(
        endpoint: string,
        options?: ApiRequestOptions,
    ): Promise<ApiResponse>;
}
