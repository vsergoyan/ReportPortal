import { test, expect } from '../../fixtures/test.fixture';
import {
    CreateDashboardResponse,
    PatchDashboardResponse,
} from '../../api/models/dashboardResponse';
import { PatchDashboardRequest } from '../../api/models/dashboardRequest';
import { ApiErrorResponse } from '../../api/models/errorResponse';

test.describe('Dashboards', () => {
    let createdDashboardId: number;

    test.beforeEach(() => {
        createdDashboardId = 0;
    });

    test('Patch dashboard', async ({ dashboardApi }) => {
        // Create dashboard at first
        const timestamp = new Date().toISOString();
        const dashboardsResponse = await dashboardApi.createDashboard({
            name: `Demo dashboard ${timestamp}`
        });

        expect(dashboardsResponse.status()).toBe(201);
        const createdDashboard: CreateDashboardResponse= await dashboardsResponse.json();
        expect(createdDashboard.id).toBeTruthy();
        createdDashboardId = +createdDashboard.id;

        const patchResponse = await dashboardApi.patchDashboard(createdDashboard.id, { locked: true });
        expect(patchResponse.status()).toBe(200);
        const body: PatchDashboardResponse = await patchResponse.json();
        expect(body.message).toBe('Dashboard has been updated successfully');
    });

    test('Patch dashboard with invalid id', async ({ dashboardApi }) => {
        const invalidId = '999999999';
        const response = await dashboardApi.patchDashboard(invalidId, { locked: true });
        expect(response.status()).toBe(404);

        const body: ApiErrorResponse = await response.json();
        expect(body.errorCode).toBe(40422);
        expect(body.message).toContain('not found');
    });

    test('Patch dashboard with invalid locked value', async ({ dashboardApi }) => {
        // Create dashboard at first
        const timestamp = new Date().toISOString();
        const createResponse = await dashboardApi.createDashboard({
            name: `Demo dashboard ${timestamp}`,
        });
        expect(createResponse.status()).toBe(201);
        const createdDashboard: CreateDashboardResponse = await createResponse.json();
        createdDashboardId = +createdDashboard.id;

        const response = await dashboardApi.patchDashboard(
            createdDashboard.id,
            {
                locked: 'invalid',
            } as unknown as PatchDashboardRequest,
        );

        expect(response.status()).toBe(400);
        const body: ApiErrorResponse = await response.json();
        expect(body.errorCode).toBe(4001);
        expect(body.message).toContain("Incorrect Request. JSON parse error: Cannot deserialize value of type `java.lang.Boolean` from String \"invalid\": only \"true\" or \"false\" recognized");
    });

    test.afterEach(async ({ dashboardApi }) => {
        if (!createdDashboardId) return;

        // DELETE dashboard
        const deleteResponse = await dashboardApi.deleteDashboard(createdDashboardId);
        expect(deleteResponse.status()).toBe(200);
    });
});
