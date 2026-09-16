export interface CreateLaunchResponse {
    id: string;
    number: number;
}

export interface LaunchResponse {
    id: number;
    uuid: string;
    name: string;
    number: number;
    startTime: string;
    status: string;
    statistics: LaunchStatistics;
}

export interface PageLaunchResponse {
    content: LaunchResponse[];
    page: PageInfo;
}

export interface PageInfo {
    number: number;
    size: number;
    totalElements: number;
    totalPages: number;
    hasNext: boolean;
}

export interface FinishLaunchResponse {
    id: string;
    number: number;
    link: string;
}

export interface LaunchStatistics {
    executions: {
        total?: number;
        passed?: number;
        failed?: number;
        skipped?: number;
    };
    defects: Record<string, {
        total: number;
        [key: string]: number;
    }>;
}
