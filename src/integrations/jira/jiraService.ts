import axios, { AxiosInstance } from 'axios';

export class JiraService {
    private readonly client: AxiosInstance;

    constructor(
        baseUrl: string,
        apiToken: string,
    ) {
        this.client = axios.create({
            baseURL: baseUrl,
            headers: {
                Authorization: `Bearer ${apiToken}`,
                Accept: 'application/json',
            },
        });
    }

    public async getIssue(issueKey: string): Promise<unknown> {
        const response = await this.client.get(
            `/rest/api/2/issue/${issueKey}`,
        );

        return response.data;
    }

    public async getEditMetadata(issueKey: string): Promise<unknown> {
        const response = await this.client.get(
            `/rest/api/2/issue/${issueKey}/editmeta`,
        );

        return response.data;
    }

    public async updateTestStatus(
        issueKey: string,
        status: string,
    ): Promise<void> {
        await this.client.put(
            `/rest/api/2/issue/${issueKey}`,
            {
                fields: {
                    customfield_31501: status,
                },
            },
        );
    }
}
