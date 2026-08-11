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
