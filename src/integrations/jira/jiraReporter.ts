import {
    Reporter,
    TestCase,
    TestResult,
} from '@playwright/test/reporter';
import { JiraService } from './jiraService';

export default class JiraReporter implements Reporter {
    private jiraService?: JiraService;

    constructor() {
        const baseUrl = process.env.JIRA_BASE_URL;
        const apiToken = process.env.JIRA_API_TOKEN;

        if (baseUrl && apiToken) {
            this.jiraService = new JiraService(
                baseUrl,
                apiToken,
            );
        }
    }

    public async onTestEnd(
        test: TestCase,
        result: TestResult,
    ): Promise<void> {
        if (!this.jiraService) {
            return;
        }

        const jiraAnnotation = test.annotations.find(
            (annotation) => annotation.type === 'jira',
        );

        if (!jiraAnnotation?.description) {
            return;
        }

        const jiraTestCaseId = jiraAnnotation.description;

        const status =
            result.status === 'passed'
                ? 'Passed'
                : 'Failed';

        await this.jiraService.updateTestStatus(
            jiraTestCaseId,
            status,
        );

        console.log(
            `Jira ${jiraTestCaseId} updated to ${status}`,
        );
    }
}
