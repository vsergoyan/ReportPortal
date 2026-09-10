import {
    APIRequestContext,
    APIResponse as PlaywrightResponse,
} from '@playwright/test';

import { Authenticator } from '../auth/apiAuthenticator';
import { Config } from '../../core/config/Config';
import { logger } from '../../core/logger';
import { ApiClient } from './apiClient';
import { ApiRequestOptions } from '../models/apiRequest';
import { ApiResponse } from '../models/apiResponse';

class PlaywrightApiResponse implements ApiResponse {
    constructor(private readonly response: PlaywrightResponse) {}

    status(): number {
        return this.response.status();
    }

    statusText(): string {
        return this.response.statusText();
    }

    async json<T = unknown>(): Promise<T> {
        return this.response.json();
    }
}

export class PlaywrightApiClient implements ApiClient {
    constructor(
        private readonly request: APIRequestContext,
        private readonly config: Config,
        private readonly authenticator: Authenticator,
    ) {}

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
        const response = await this.request.fetch(url, {
            method,
            data: options.data,
            headers: {
                ...this.authenticator.getHeaders(),
                ...options.headers,
            },
        });
        logger.info(
            `${method} ${url} → ${response.status()} ${response.statusText()}`,
        );
        return new PlaywrightApiResponse(response);
    }
}
