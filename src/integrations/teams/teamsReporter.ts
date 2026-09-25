import {
    FullConfig,
    FullResult,
    Reporter,
    Suite,
} from '@playwright/test/reporter';
import { TeamsService } from './teamsService';

export default class TeamsReporter implements Reporter {
    private teamsService?: TeamsService;
    private totalTests = 0;

    public onBegin(
        _config: FullConfig,
        suite: Suite,
    ): void {
        const webhookUrl = process.env.TEAMS_WEBHOOK_URL;

        if (!webhookUrl) {
            return;
        }

        this.teamsService = new TeamsService(webhookUrl);
        this.totalTests = suite.allTests().length;

        void this.teamsService.sendStartMessage();
    }

    public async onEnd(result: FullResult): Promise<void> {
        if (!this.teamsService) {
            return;
        }

        await this.teamsService.sendFinishMessage(
            result.status,
            this.totalTests,
        );
    }
}
