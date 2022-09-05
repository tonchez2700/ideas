export interface ScheduleState {
    fetching:   boolean;
}

type ScheduleAction =
    | { type: 'schedule/fetching', payload: { fetching: boolean }}


export const ScheduleReducer = (state: ScheduleState, action: ScheduleAction): ScheduleState => {
    switch (action.type) {
        case 'schedule/fetching':
            return {
                ...state,
                fetching: action.payload.fetching,
            }
        default:
            return state;
    }
}