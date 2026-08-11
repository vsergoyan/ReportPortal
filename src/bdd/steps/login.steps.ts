import { When } from '@cucumber/cucumber';
import { CustomWorld } from '../context/customWorld';
import {userInfo} from '../../business/constants';

When('User logs in with {string} credentials', async function (this: CustomWorld, credentialsType: string) {
        const credentials = userInfo[credentialsType as keyof typeof userInfo];
        if (!credentials) {
            throw new Error(`Unknown credentials type: ${credentialsType}`);
        }

        await this.pages.login.login(
            credentials.username,
            credentials.password
        );
    }
);
