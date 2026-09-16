import { LAUNCH_STATISTIC_COLUMNS } from '../../business/constants';
import { PageLaunchResponse } from '../../api/models/launchResponses';
import { DateUtils } from '../../core/utils/dateUtils';

export function getSortedStartTimes(
    response: PageLaunchResponse,
    descending: boolean,
): number[] {
    return [...response.content]
        .sort((a, b) => {
            const difference =
                DateUtils.convertToTimestamp(a.startTime) -
                DateUtils.convertToTimestamp(b.startTime);

            return descending ? -difference : difference;
        })
        .map((launch) =>
            DateUtils.normalizeToSeconds(
                DateUtils.convertToTimestamp(launch.startTime),
            ),
        );
}

export function convertToTimestamps(
    startTimes: string[],
): number[] {
    return startTimes.map((startTime) =>
        DateUtils.convertToTimestamp(startTime),
    );
}

type LaunchStatistic = {
    column: string;
    value: number | undefined;
    type: 'execution' | 'defect';
};

export function getLaunchStatistics(
    launch: PageLaunchResponse['content'][number],
): LaunchStatistic[] {
    return [
        {
            column: LAUNCH_STATISTIC_COLUMNS.TOTAL,
            value: launch.statistics.executions.total,
            type: 'execution',
        },
        {
            column: LAUNCH_STATISTIC_COLUMNS.PASSED,
            value: launch.statistics.executions.passed,
            type: 'execution',
        },
        {
            column: LAUNCH_STATISTIC_COLUMNS.FAILED,
            value: launch.statistics.executions.failed,
            type: 'execution',
        },
        {
            column: LAUNCH_STATISTIC_COLUMNS.SKIPPED,
            value: launch.statistics.executions.skipped,
            type: 'execution',
        },
        {
            column: LAUNCH_STATISTIC_COLUMNS.PRODUCT_BUG,
            value: launch.statistics.defects.product_bug?.total,
            type: 'defect',
        },
        {
            column: LAUNCH_STATISTIC_COLUMNS.AUTO_BUG,
            value: launch.statistics.defects.automation_bug?.total,
            type: 'defect',
        },
        {
            column: LAUNCH_STATISTIC_COLUMNS.SYSTEM_ISSUE,
            value: launch.statistics.defects.system_issue?.total,
            type: 'defect',
        },
        {
            column: LAUNCH_STATISTIC_COLUMNS.TO_INVESTIGATE,
            value: launch.statistics.defects.to_investigate?.total,
            type: 'defect',
        },
    ];
}
