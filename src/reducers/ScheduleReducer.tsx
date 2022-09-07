import { ScheduleResponse } from '../helpers/interfaces/appInterfaces';
import { AgendaDataType } from '../helpers/interfaces/appTypes';

export interface ScheduleState {
    error: boolean,
    fetching:   boolean;
    appointments:   Array<ScheduleResponse>;
    message: string | unknown
    agenda: AgendaDataType;
}

type ScheduleAction =
    | { type: 'schedule/fetching', payload: { fetching: boolean }}
    | { type: 'schedule/set_appointments', payload: { appointments: [], agenda: AgendaDataType }}
    | { type: 'schedule/set_error', payload: { message: string | unknown }}


export const ScheduleReducer = (state: ScheduleState, action: ScheduleAction): ScheduleState => {
    switch (action.type) {
        case 'schedule/fetching':
            return {
                ...state,
                fetching: action.payload.fetching,
            }
        case 'schedule/set_appointments':
            return {
                ...state,
                agenda: action.payload.agenda,
                appointments: action.payload.appointments,
            }
        case 'schedule/set_error':
            return {
                ...state,
                error: true,
                message: action.payload.message,
            }
        default:
            return state;
    }
}