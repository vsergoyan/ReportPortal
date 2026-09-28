export function jiraTest(testCaseId: string) {
    return {
        annotation: {
            type: 'jira',
            description: testCaseId,
        },
    };
}
