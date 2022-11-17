import { NumericLiteral } from '@babel/types';
import { ScheduleResponse } from '../helpers/interfaces/appInterfaces';
import { AgendaDataType } from '../helpers/interfaces/appTypes';

export interface GoalState {
    error: boolean,
    fetching: boolean,
    message: string | unknown,
    modalVisible: boolean,
    personalGoal: string,
    progress: string,
}

type GoalActions =
    | { type: 'goal/fetching', payload: { fetching: boolean } }
    | { type: 'goal/set_error', payload: { message: string | unknown } }
    | { type: 'goal/update_personal_goal', payload: { fetching: boolean } }
    | { type: 'goal/set_progress_gamen', payload: { progress: any } }
    | { type: 'goal/set_modal_visibility_state', payload: { modalVisible: boolean } }


export const GoalReducer = (state: GoalState, action: GoalActions): GoalState => {
    switch (action.type) {
        case 'goal/fetching':
            return {
                ...state,
                fetching: action.payload.fetching,
            }
        case 'goal/set_error':
            return {
                ...state,
                error: true,
                message: action.payload.message,
            }
        case 'goal/update_personal_goal':
            return {
                ...state,
                fetching: action.payload.fetching,
                modalVisible: false,
            }
        case 'goal/set_progress_gamen':
            return {
                ...state,
                progress: action.payload.progress
            }
        case 'goal/set_modal_visibility_state':
            return {
                ...state,
                fetching: false,
                personalGoal: '',
                modalVisible: action.payload.modalVisible
            }
        default:
            return state;
    }
}