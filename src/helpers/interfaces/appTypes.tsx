import { ScheduleResponse } from './appInterfaces';

export declare type AgendaScheduleDataType = {
    [key: string]: Array<{
        height?: number;
        id?: number;
        name: String
    }>
};

export declare type AgendaDataType = {
    schedules: any
};

export declare type AppointmentsResponseType = Array<ScheduleResponse>