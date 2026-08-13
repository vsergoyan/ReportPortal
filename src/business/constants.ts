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

export type MessageKey = keyof typeof messages;
