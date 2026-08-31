import { ApiResponse } from '../models/apiResponse';
import { ApiClient } from '../clients/apiClient';
import { CreateDashboardRequest, PatchDashboardRequest } from '../models/dashboardRequest';

export class DashboardApi {
    constructor(
        private readonly apiClient: ApiClient,
        private readonly projectName: string,
    ) {}

    async createDashboard(body: CreateDashboardRequest): Promise<ApiResponse> {
        return this.apiClient.post(
            `/${this.projectName}/dashboard`,
            {
                data: body,
            },
        );
    }

    async patchDashboard(
        dashboardId: string,
        body: PatchDashboardRequest,
    ): Promise<ApiResponse> {
        return this.apiClient.patch(
            `/${this.projectName}/dashboard/${dashboardId}`,
            {
                data: body,
            },
        );
    }

    async deleteDashboard(dashboardId: number): Promise<ApiResponse> {
        return this.apiClient.delete(
            `/${this.projectName}/dashboard/${dashboardId}`,
        );
    }
}
