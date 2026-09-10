import { test, expect } from '../../fixtures/test.fixture';
import {
    CreateDashboardResponse,
    PatchDashboardResponse,
} from '../../api/models/dashboardResponse';
import { PatchDashboardRequest } from '../../api/models/dashboardRequest';
import { ApiErrorResponse } from '../../api/models/errorResponse';
import { API_ERROR_MESSAGES, invalidLaunchId } from 'src/business/constants';

test.describe('Dashboards', () => {

    test('Patch dashboard', async ({ dashboardApi, createdDashboard }) => {
        // Create dashboard at first
        const timestamp = new Date().toISOString();
        const dashboardsResponse = await dashboardApi.createDashboard({
            name: `Demo dashboard ${timestamp}`
        });

        expect(dashboardsResponse.status()).toBe(201);
        const createdDashboardResponse: CreateDashboardResponse= await dashboardsResponse.json();
        expect(createdDashboardResponse.id).toBeTruthy();
        createdDashboard.id = +createdDashboardResponse.id;
        const patchResponse = await dashboardApi.patchDashboard(createdDashboardResponse.id, { locked: true });
        expect(patchResponse.status()).toBe(200);
        const body: PatchDashboardResponse = await patchResponse.json();
        expect(body.message).toBe('Dashboard has been updated successfully');
    });

    test('Patch dashboard with invalid id', async ({ dashboardApi }) => {
        const response = await dashboardApi.patchDashboard(invalidLaunchId, { locked: true });
        expect(response.status()).toBe(404);

        const body: ApiErrorResponse = await response.json();
        expect(body.errorCode).toBe(40422);
        expect(body.message).toContain(API_ERROR_MESSAGES.notFoundError);
    });

    test('Patch dashboard with invalid locked value', async ({ dashboardApi, createdDashboard}) => {
        // Create dashboard at first
        const timestamp = new Date().toISOString();
        const createResponse = await dashboardApi.createDashboard({
            name: `Demo dashboard ${timestamp}`,
        });
        expect(createResponse.status()).toBe(201);
        const createdDashboardResponse: CreateDashboardResponse = await createResponse.json();
        createdDashboard.id = +createdDashboardResponse.id;

        const response = await dashboardApi.patchDashboard(
            createdDashboardResponse.id,
            {
                locked: 'invalid',
            } as unknown as PatchDashboardRequest,
        );

        expect(response.status()).toBe(400);
        const body: ApiErrorResponse = await response.json();
        expect(body.errorCode).toBe(4001);
        expect(body.message).toContain(API_ERROR_MESSAGES.incorrectRequestInvalidValue);
    });

    test.afterEach(async ({ dashboardApi, createdDashboard }) => {
        if (!createdDashboard.id) return;

        // DELETE dashboard
        const deleteResponse = await dashboardApi.deleteDashboard(+createdDashboard.id);
        expect(deleteResponse.status()).toBe(200);
    });
});
