export const userInfo = {
    get valid() {
        return {
            username: process.env.RP_USERNAME ?? '',
            password: process.env.RP_PASSWORD ?? '',
        };
    },
    invalid: {
        username: 'wrong',
        password: 'wrong',
    },
};

export const API_PATHS = {
    launch: '/api/v1/{project}/launch/',
};

export const messages = {
    successfullLogin: 'Signed in successfully',
    badCredentials: 'An error occurred while connecting to server: You do not have enough permissions. Bad credentials',
};

export const invalidLaunchId = '999999999';

export const API_ERROR_MESSAGES = {
    notFoundError: 'not found',
    incorrectRequest: 'Incorrect Request. I/O error while reading input message',
    incorrectRequestEmptyName: 'Incorrect Request. [Field \'name\' should not contain only white spaces and shouldn\'t be empty. Field \'name\' should have size from \'1\' to \'256\'.] ',
    incorrectRequestValueNotAllowed: 'Incorrect Request. [Value is not allowed for field \'status\'.]',
    incorrectRequestInvalidValue: 'Incorrect Request. JSON parse error: Cannot deserialize value of type `java.lang.Boolean` from String "invalid": only "true" or "false" recognized',
};

export type MessageKey = keyof typeof messages;

export const LAUNCH_STATISTIC_COLUMNS = {
    TOTAL: 'total-col',
    PASSED: 'passed-col',
    FAILED: 'failed-col',
    SKIPPED: 'skipped-col',
    PRODUCT_BUG: 'pb-col',
    AUTO_BUG: 'ab-col',
    SYSTEM_ISSUE: 'si-col',
    TO_INVESTIGATE: 'ti-col',
} as const;
