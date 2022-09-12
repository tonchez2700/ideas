import React, { useReducer, createContext } from 'react';

import ideasApi from '../api/ideasApi';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ScheduleReducer, ScheduleState } from '../reducers/ScheduleReducer';

import { ScheduleResponse } from '../helpers/interfaces/appInterfaces';
import { AgendaScheduleDataType, AgendaDataType } from '../helpers/interfaces/appTypes';
import { getAgendaScheduleFormatByAppointmentsResponse } from '../helpers/tools';

type ScheduleContextProps = {
    agenda: AgendaDataType,
    fetching: boolean,
    fetchAppointments: () => Promise<void>; // TODO: cambiar ANY
    handleUpdateScheduleStatus: (id_agenda: number) => Promise<void>; // TODO: cambiar ANY
}

const scheduleInitialState: ScheduleState = {
    error: false,
    fetching: false,
    appointments: [],
    message: '',
    agenda: {
        schedules: {}
    },
}

export const ScheduleContext = createContext({} as ScheduleContextProps);

export const ScheduleProvider = ({ children }: any ) => {
    const [state, dispatch] = useReducer(ScheduleReducer, scheduleInitialState);

    const fetchAppointments = async() => {
        try {
            dispatch({
                type: 'schedule/fetching',
                payload: { fetching: true }
            });
            const localStorage = await AsyncStorage.getItem('userIdeas');
            const user = localStorage != null ? JSON.parse(localStorage) : null
            const { data }: any = await ideasApi.get<ScheduleResponse>(`/appointments`, {
                params: { agent_id: user.id }
            });
            if(data.length > 0){
                const schedules: AgendaScheduleDataType = getAgendaScheduleFormatByAppointmentsResponse(data)
                dispatch({
                    type: 'schedule/set_appointments',
                    payload: { 
                        appointments: data,
                        agenda: { schedules }
                    }
                });
            }else{
                throw "No se encontraron tareas disponibles."
            }
        } catch (e) {
            dispatch({
                type: 'schedule/set_error',
                payload: { message: e }
            });
        }
    }

    const handleUpdateScheduleStatus = async(id_agenda: number) => {
        try {
            dispatch({
                type: 'schedule/fetching',
                payload: { fetching: true }
            });
            const { data }: any = await ideasApi.put(`/appointments/${id_agenda}`, { "is_done": 1 })
            dispatch({
                type: 'schedule/fetching',
                payload: { fetching: false }
            });
            if(!data)
                throw "Error al editar el registro"
            
        } catch (error) {
            console.log("From catch", error)
        }
        
    }

    return (
        <ScheduleContext.Provider value={{
            ...state,
            fetchAppointments,
            handleUpdateScheduleStatus,
        }}>
            { children }
        </ScheduleContext.Provider>
    )
}