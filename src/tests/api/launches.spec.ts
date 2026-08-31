import {
    CreateLaunchResponse,
    LaunchResponse,
    PageLaunchResponse,
    FinishLaunchResponse
} from '../../api/models/launchResponses';
import { ApiErrorResponse } from '../../api/models/errorResponse';

import { test, expect } from '../../fixtures/test.fixture';
import { LaunchStatus } from '../../api/models/launchStatus';

test.describe('Launches', () => {
    let createdLaunchUuid: string;

    test.beforeEach(() => {
        createdLaunchUuid = '';
    });

    test('Get launches', async ({ launchesApi }) => {
        const response = await launchesApi.getLaunches();
        expect(response.status()).toBe(200);

        const body: PageLaunchResponse = await response.json();
        expect(Array.isArray(body.content)).toBe(true);
        expect(body.content.length).toBeGreaterThan(0);

        for (const launch of body.content) {
            expect(launch.id).toBeTruthy();
            expect(launch.uuid).toBeTruthy();
            expect(launch.name).toBeTruthy();
        }
    });

    test('Get launch with valid id', async ({ launchesApi }) => {
        // Create launch at first
        const timestamp = new Date().toISOString();
        const createLaunchResponse = await launchesApi.createLaunch({
            startTime: timestamp,
            name: `Demo launch ${timestamp}`,
        });
        expect(createLaunchResponse.status()).toBe(201);
        const createdLaunch: CreateLaunchResponse = await createLaunchResponse.json();
        createdLaunchUuid = createdLaunch.id;

        const getLaunchResponse = await launchesApi.getLaunch(createdLaunch.id);
        expect(getLaunchResponse.status()).toBe(200);

        const launch: LaunchResponse = await getLaunchResponse.json();
        expect(launch.id).toBeGreaterThan(0);
        expect(launch.uuid).toBe(createdLaunch.id);
        expect(launch.name).toBe(`Demo launch ${timestamp}`);
    });

    test('Get launch with invalid id', async ({ launchesApi }) => {
        const invalidLaunchId = '99999999';
        const response = await launchesApi.getLaunch(invalidLaunchId);
        expect(response.status()).toBe(404);

        const body: ApiErrorResponse = await response.json();
        expect(body.errorCode).toBe(4041);
        expect(body.message).toContain('not found');
    });

    test('Create launch', async ({ launchesApi }) => {
        const timestamp = new Date().toISOString();
        const response = await launchesApi.createLaunch({
            startTime: timestamp,
            name: `Demo launch ${timestamp}`,
        });
        expect(response.status()).toBe(201);
        const createdLaunch: CreateLaunchResponse = await response.json();
        createdLaunchUuid = createdLaunch.id;

        expect(createdLaunch.id).toBeTruthy();
        expect(createdLaunch.number).toBeGreaterThan(0);
    });

    test('Create launch with invalid start time', async ({ launchesApi }) => {
        const response = await launchesApi.createLaunch({
            startTime: 'Invalid timestamp',
            name: 'Invalid launch',
        });
        expect(response.status()).toBe(400);
        const body: ApiErrorResponse = await response.json();
        expect(body.errorCode).toBe(4001);
        expect(body.message).toContain('Incorrect Request. I/O error while reading input message');
    });

    test('Create launch with invalid name', async ({ launchesApi }) => {
        const response = await launchesApi.createLaunch({
            startTime: new Date().toISOString(),
            name: '',
        });
        expect(response.status()).toBe(400);

        const body: ApiErrorResponse = await response.json();
        expect(body.errorCode).toBe(4001);
        expect(body.message).toContain("Incorrect Request. [Field 'name' should not contain only white spaces and shouldn't be empty. Field 'name' should have size from '1' to '256'.] ");
    });

    test('Finish launch', async ({ launchesApi }) => {
        const timestamp = new Date().toISOString();
        const createResponse = await launchesApi.createLaunch({
            startTime: timestamp,
            name: `Demo launch ${timestamp}`,
        });
        expect(createResponse.status()).toBe(201);
        const createdLaunch: CreateLaunchResponse = await createResponse.json();
        expect(createdLaunch.id).toBeTruthy();
        createdLaunchUuid = createdLaunch.id;

        const finishResponse = await launchesApi.finishLaunch(createdLaunch.id, LaunchStatus.PASSED);
        expect(finishResponse.status()).toBe(200);

        const body: FinishLaunchResponse = await finishResponse.json();
        expect(body.id).toBe(createdLaunch.id);
        expect(body.number).toBeGreaterThan(0);
    });

    test('Finish launch with invalid id', async ({ launchesApi }) => {
        const invalidLaunchId = '99999999';
        const response = await launchesApi.finishLaunch(invalidLaunchId, LaunchStatus.PASSED);
        expect(response.status()).toBe(404);

        const body: ApiErrorResponse = await response.json();
        expect(body.errorCode).toBe(4041);
        expect(body.message).toContain('not found');
    });

    test('Finish launch with invalid status', async ({ launchesApi }) => {
        const timestamp = new Date().toISOString();
        const createResponse = await launchesApi.createLaunch({
            startTime: timestamp,
            name: `Demo launch ${timestamp}`,
        });
        expect(createResponse.status()).toBe(201);
        const createdLaunch: CreateLaunchResponse = await createResponse.json();
        createdLaunchUuid = createdLaunch.id;

        const finishResponse = await launchesApi.finishLaunch(createdLaunch.id, 'INVALID_STATUS' as LaunchStatus,);
        expect(finishResponse.status()).toBe(400);

        const body: ApiErrorResponse = await finishResponse.json();
        expect(body.errorCode).toBe(4001);
        expect(body.message).toContain("Incorrect Request. [Value is not allowed for field 'status'.]");
    });

    test('Delete launch', async ({ launchesApi }) => {
        // Create launch at first
        const timestamp = new Date().toISOString();
        const createResponse = await launchesApi.createLaunch({
            startTime: timestamp,
            name: `Demo launch ${timestamp}`,
        });
        expect(createResponse.status()).toBe(201);
        const createdLaunch: CreateLaunchResponse = await createResponse.json();
        createdLaunchUuid = createdLaunch.id;

        // Finish it
        const finishResponse = await launchesApi.finishLaunch(createdLaunch.id, LaunchStatus.PASSED);
        expect(finishResponse.status()).toBe(200);

        // Get the real id (not uuid), becuase it's needed for delete endpoint
        const getResponse = await launchesApi.getLaunch(createdLaunchUuid);
        expect(getResponse.status()).toBe(200);
        const launch: LaunchResponse = await getResponse.json();

        // Delete it
        const deleteResponse = await launchesApi.deleteLaunch(launch.id);
        expect(deleteResponse.status()).toBe(200);

        const getAfterDeleteResponse = await launchesApi.getLaunch(createdLaunchUuid);
        expect(getAfterDeleteResponse.status()).toBe(404);
    });

    test('Delete launch with invalid id', async ({ launchesApi }) => {
        const invalidId = 99999999;
        const deleteResponse = await launchesApi.deleteLaunch(invalidId);
        expect(deleteResponse.status()).toBe(404);

        const body: ApiErrorResponse = await deleteResponse.json();
        expect(body.errorCode).toBe(4041);
        expect(body.message).toContain('not found');
    });

    test.afterEach(async ({ launchesApi }) => {
        if (!createdLaunchUuid) return;

        // GET launch using UUID
        const getResponse = await launchesApi.getLaunch(createdLaunchUuid);
        if (getResponse.status() === 404) return;
        expect(getResponse.status()).toBe(200);
        const launch: LaunchResponse = await getResponse.json();

        // Finish only if the launch is still running
        if (launch.status === 'IN_PROGRESS') {
            const finishResponse = await launchesApi.finishLaunch(createdLaunchUuid, LaunchStatus.PASSED);
            expect(finishResponse.status()).toBe(200);
        }

        // DELETE requires the integer launch ID
        const deleteResponse = await launchesApi.deleteLaunch(launch.id);
        expect(deleteResponse.status()).toBe(200);
    });
});
