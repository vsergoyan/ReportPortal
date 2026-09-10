import {
    CreateLaunchResponse,
    LaunchResponse,
    PageLaunchResponse,
    FinishLaunchResponse
} from '../../api/models/launchResponses';
import { ApiErrorResponse } from '../../api/models/errorResponse';

import { test, expect } from '../../fixtures/test.fixture';
import { LaunchStatus } from '../../api/models/launchStatus';
import { invalidLaunchId, API_ERROR_MESSAGES } from '../../business/constants';

test.describe('Launches', () => {

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

    test('Get launch with valid id', async ({ launchesApi, createdLaunch }) => {
        // Create launch at first
        const timestamp = new Date().toISOString();
        const createLaunchResponse = await launchesApi.createLaunch({
            startTime: timestamp,
            name: `Demo launch ${timestamp}`,
        });
        expect(createLaunchResponse.status()).toBe(201);
        const createdLaunchResponse: CreateLaunchResponse = await createLaunchResponse.json();
        createdLaunch.uuid = createdLaunchResponse.id;

        const getLaunchResponse = await launchesApi.getLaunch(createdLaunchResponse.id);
        expect(getLaunchResponse.status()).toBe(200);

        const launch: LaunchResponse = await getLaunchResponse.json();
        expect(launch.id).toBeGreaterThan(0);
        expect(launch.uuid).toBe(createdLaunchResponse.id);
        expect(launch.name).toBe(`Demo launch ${timestamp}`);
    });

    test('Get launch with invalid id', async ({ launchesApi }) => {
        const response = await launchesApi.getLaunch(invalidLaunchId);
        expect(response.status()).toBe(404);

        const body: ApiErrorResponse = await response.json();
        expect(body.errorCode).toBe(4041);
        expect(body.message).toContain(API_ERROR_MESSAGES.notFoundError);
    });

    test('Create launch', async ({ launchesApi, createdLaunch }) => {
        const timestamp = new Date().toISOString();
        const response = await launchesApi.createLaunch({
            startTime: timestamp,
            name: `Demo launch ${timestamp}`,
        });
        expect(response.status()).toBe(201);
        const createdLaunchResponse: CreateLaunchResponse = await response.json();
        createdLaunch.uuid = createdLaunchResponse.id;

        expect(createdLaunchResponse.id).toBeTruthy();
        expect(createdLaunchResponse.number).toBeGreaterThan(0);
    });

    test('Create launch with invalid start time', async ({ launchesApi }) => {
        const response = await launchesApi.createLaunch({
            startTime: 'Invalid timestamp',
            name: 'Invalid launch',
        });
        expect(response.status()).toBe(400);
        const body: ApiErrorResponse = await response.json();
        expect(body.errorCode).toBe(4001);
        expect(body.message).toContain(API_ERROR_MESSAGES.incorrectRequest);
    });

    test('Create launch with invalid name', async ({ launchesApi }) => {
        const response = await launchesApi.createLaunch({
            startTime: new Date().toISOString(),
            name: '',
        });
        expect(response.status()).toBe(400);

        const body: ApiErrorResponse = await response.json();
        expect(body.errorCode).toBe(4001);
        expect(body.message).toContain(API_ERROR_MESSAGES.incorrectRequestEmptyName);
    });

    test('Finish launch', async ({ launchesApi, createdLaunch }) => {
        const timestamp = new Date().toISOString();
        const createResponse = await launchesApi.createLaunch({
            startTime: timestamp,
            name: `Demo launch ${timestamp}`,
        });
        expect(createResponse.status()).toBe(201);
        const createdLaunchResponse: CreateLaunchResponse = await createResponse.json();
        expect(createdLaunchResponse.id).toBeTruthy();
        createdLaunch.uuid = createdLaunchResponse.id;

        const finishResponse = await launchesApi.finishLaunch(createdLaunchResponse.id, LaunchStatus.PASSED);
        expect(finishResponse.status()).toBe(200);

        const body: FinishLaunchResponse = await finishResponse.json();
        expect(body.id).toBe(createdLaunchResponse.id);
        expect(body.number).toBeGreaterThan(0);
    });

    test('Finish launch with invalid id', async ({ launchesApi }) => {
        const response = await launchesApi.finishLaunch(invalidLaunchId, LaunchStatus.PASSED);
        expect(response.status()).toBe(404);

        const body: ApiErrorResponse = await response.json();
        expect(body.errorCode).toBe(4041);
        expect(body.message).toContain(API_ERROR_MESSAGES.notFoundError);
    });

    test('Finish launch with invalid status', async ({ launchesApi, createdLaunch }) => {
        const timestamp = new Date().toISOString();
        const createResponse = await launchesApi.createLaunch({
            startTime: timestamp,
            name: `Demo launch ${timestamp}`,
        });
        expect(createResponse.status()).toBe(201);
        const createdLaunchResponse: CreateLaunchResponse = await createResponse.json();
        createdLaunch.uuid = createdLaunchResponse.id;

        const finishResponse = await launchesApi.finishLaunch(createdLaunchResponse.id, 'INVALID_STATUS' as LaunchStatus,);
        expect(finishResponse.status()).toBe(400);

        const body: ApiErrorResponse = await finishResponse.json();
        expect(body.errorCode).toBe(4001);
        expect(body.message).toContain(API_ERROR_MESSAGES.incorrectRequestValueNotAllowed);
    });

    test('Delete launch', async ({ launchesApi, createdLaunch }) => {
        // Create launch at first
        const timestamp = new Date().toISOString();
        const createResponse = await launchesApi.createLaunch({
            startTime: timestamp,
            name: `Demo launch ${timestamp}`,
        });
        expect(createResponse.status()).toBe(201);
        const createdLaunchResponse: CreateLaunchResponse = await createResponse.json();
        createdLaunch.uuid = createdLaunchResponse.id;

        // Finish it
        const finishResponse = await launchesApi.finishLaunch(createdLaunchResponse.id, LaunchStatus.PASSED);
        expect(finishResponse.status()).toBe(200);

        // Get the real id (not uuid), becuase it's needed for delete endpoint
        const getResponse = await launchesApi.getLaunch(createdLaunch.uuid);
        expect(getResponse.status()).toBe(200);
        const launch: LaunchResponse = await getResponse.json();

        // Delete it
        const deleteResponse = await launchesApi.deleteLaunch(launch.id);
        expect(deleteResponse.status()).toBe(200);

        const getAfterDeleteResponse = await launchesApi.getLaunch(createdLaunch.uuid);
        expect(getAfterDeleteResponse.status()).toBe(404);
    });

    test('Delete launch with invalid id', async ({ launchesApi }) => {
        const deleteResponse = await launchesApi.deleteLaunch(+invalidLaunchId);
        expect(deleteResponse.status()).toBe(404);

        const body: ApiErrorResponse = await deleteResponse.json();
        expect(body.errorCode).toBe(4041);
        expect(body.message).toContain(API_ERROR_MESSAGES.notFoundError);
    });

    test.afterEach(async ({ launchesApi, createdLaunch }) => {
        if (!createdLaunch.uuid) return;

        // GET launch using UUID
        const getResponse = await launchesApi.getLaunch(createdLaunch.uuid);
        if (getResponse.status() === 404) return;
        expect(getResponse.status()).toBe(200);
        const launch: LaunchResponse = await getResponse.json();

        // Finish only if the launch is still running
        if (launch.status === 'IN_PROGRESS') {
            const finishResponse = await launchesApi.finishLaunch(createdLaunch.uuid, LaunchStatus.PASSED);
            expect(finishResponse.status()).toBe(200);
        }

        // DELETE requires the integer launch ID
        const deleteResponse = await launchesApi.deleteLaunch(launch.id);
        expect(deleteResponse.status()).toBe(200);
    });
});
