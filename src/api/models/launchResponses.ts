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
