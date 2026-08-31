export interface PatchDashboardRequest {
    locked: boolean;
}

export interface CreateDashboardRequest {
    description?: string;
    name: string;
}
