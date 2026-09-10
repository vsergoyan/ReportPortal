import axios, { AxiosInstance, AxiosResponse } from 'axios';

import { Authenticator } from '../auth/apiAuthenticator';
import { Config } from '../../core/config/Config';
import { logger } from '../../core/logger';
import { ApiClient } from './apiClient';
import { ApiRequestOptions } from '../models/apiRequest';
import { ApiResponse } from '../models/apiResponse';

class AxiosApiResponse implements ApiResponse {
    constructor(private readonly response: AxiosResponse) {}

    status(): number {
        return this.response.status;
    }

    statusText(): string {
        return this.response.statusText;
    }

    async json<T = unknown>(): Promise<T> {
        return this.response.data;
    }
}

export class AxiosApiClient implements ApiClient {
    private readonly client: AxiosInstance;

    constructor(
        private readonly config: Config,
        private readonly authenticator: Authenticator,
    ) {
        this.client = axios.create({
            baseURL: config.reportPortalEndpoint,
            timeout: 15000,
        });
    }

    async get(
        endpoint: string,
        options?: ApiRequestOptions,
    ): Promise<ApiResponse> {
        return this.sendRequest('GET', endpoint, options);
    }

    async post(
        endpoint: string,
        options?: ApiRequestOptions,
    ): Promise<ApiResponse> {
        return this.sendRequest('POST', endpoint, options);
    }

    async put(
        endpoint: string,
        options?: ApiRequestOptions,
    ): Promise<ApiResponse> {
        return this.sendRequest('PUT', endpoint, options);
    }

    async patch(
        endpoint: string,
        options?: ApiRequestOptions,
    ): Promise<ApiResponse> {
        return this.sendRequest('PATCH', endpoint, options);
    }

    async delete(
        endpoint: string,
        options?: ApiRequestOptions,
    ): Promise<ApiResponse> {
        return this.sendRequest('DELETE', endpoint, options);
    }

    private async sendRequest(
        method: string,
        endpoint: string,
        options: ApiRequestOptions = {},
    ): Promise<ApiResponse> {
        const url = `${this.config.reportPortalEndpoint}${endpoint}`;
        logger.info(`${method} ${url}`);
        const response = await this.client.request({
            method,
            url: endpoint,
            data: options.data,
            headers: {
                ...this.authenticator.getHeaders(),
                ...options.headers,
            },
            validateStatus: () => true,
        });
        logger.info(
            `${method} ${url} → ${response.status} ${response.statusText}`,
        );
        return new AxiosApiResponse(response);
    }
}
