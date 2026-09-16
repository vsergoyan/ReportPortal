import { ApiResponse } from '../models/apiResponse';
import { ApiClient } from '../clients/apiClient';
import { CreateLaunchRequest } from '../models/launchRequests';
import { LaunchStatus } from '../models/launchStatus';

export class LaunchesApi {
    constructor(
        private readonly apiClient: ApiClient,
        private readonly projectName: string,
    ) {}

    async getLaunches({
        page = 1,
        size = 50,
        sort = 'startTime,number,DESC',
    }: {
        page?: number;
        size?: number;
        sort?: string;
    } = {}): Promise<ApiResponse> {
        return this.apiClient.get(
            `/${this.projectName}/launch`,
            {
                params: {
                    'page.page': page,
                    'page.size': size,
                    'page.sort': sort,
                },
            },
        );
    }
        
    async getLaunch(launchId: string): Promise<ApiResponse> {
        return this.apiClient.get(
            `/${this.projectName}/launch/${launchId}`,
        );
    }

    async createLaunch(body: CreateLaunchRequest): Promise<ApiResponse> {
        return this.apiClient.post(
            `/${this.projectName}/launch`,
            {
                data: body,
            },
        );
    }

    async finishLaunch(launchId: string, status: LaunchStatus): Promise<ApiResponse> {
        return this.apiClient.put(
            `/${this.projectName}/launch/${launchId}/finish`,
            {
                data: {
                    endTime: new Date().toISOString(),
                    status: status,
                },
            },
        );
    }

    async deleteLaunch(launchId: number): Promise<ApiResponse> {
        return this.apiClient.delete(
            `/${this.projectName}/launch/${launchId}`,
        );
    }
}
