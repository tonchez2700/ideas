import React, { useReducer, createContext, useContext, useEffect, useState } from 'react';

import ideasApi from '../api/ideasApi';
import { AuthContext } from './AuthContext';
import { ScheduleReducer, ScheduleState } from '../reducers/ScheduleReducer';

import { ScheduleData, ScheduleResponse } from '../helpers/interfaces/appInterfaces';

type ScheduleContextProps = {
    fetching: boolean,
    handleUpdateScheduleStatus: (id_agenda: number) => Promise<void>; // TODO: cambiar ANY
}

const scheduleInitialState: ScheduleState = {
    fetching: false,
}

export const ScheduleContext = createContext({} as ScheduleContextProps);

export const ScheduleProvider = ({ children }: any ) => {
    const [state, dispatch] = useReducer(ScheduleReducer, scheduleInitialState);

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
            handleUpdateScheduleStatus
        }}>
            { children }
        </ScheduleContext.Provider>
    )
}