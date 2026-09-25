import axios from 'axios';

export class TeamsService {
    constructor(private readonly webhookUrl: string) {}

    public async sendStartMessage(): Promise<void> {
        await this.sendMessage(
            '🚀 Automated test run started',
        );
    }

    public async sendFinishMessage(
        status: string,
        totalTests: number,
    ): Promise<void> {
        await this.sendMessage(
            `Automated test run finished\n\n` +
            `Status: ${status}\n\n` +
            `Total tests: ${totalTests}`,
        );
    }

    private async sendMessage(message: string): Promise<void> {
        await axios.post(this.webhookUrl, {
            type: 'message',
            attachments: [
                {
                    contentType:
                        'application/vnd.microsoft.card.adaptive',
                    contentUrl: null,
                    content: {
                        $schema:
                            'http://adaptivecards.io/schemas/adaptive-card.json',
                        type: 'AdaptiveCard',
                        version: '1.4',
                        body: [
                            {
                                type: 'TextBlock',
                                text: message,
                                wrap: true,
                            },
                        ],
                    },
                },
            ],
        });
    }
}
