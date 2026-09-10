export interface LaunchAttribute {
    key?: string;
    value: string;
    system?: boolean;
}

export interface CreateLaunchRequest {
    startTime: string;
    name: string;
    description?: string;
    attributes?: LaunchAttribute[];
    uuid?: string;
    mode?: 'DEFAULT' | 'DEBUG';
    rerun?: boolean;
    rerunOf?: string;
}
