import React, { createContext, useContext, useEffect, useState } from 'react';

import ideasApi from '../api/ideasApi';
import { AuthContext } from './AuthContext';

import { ScheduleData, ScheduleResponse } from '../helpers/interfaces/appInterfaces';

type ScheduleContextProps = {
    appointments: ScheduleResponse[];
    isFetching: boolean,
    loadSchedule: (agentId: number) => Promise<void>;
    addSchedule: (ScheduleData: ScheduleData) => Promise<void>;
    updateSchedule: (id: number, name: string, first_name: string, second_surname: string, phone: number, agentId: number) => Promise<void>;
    deleteSchedule: (id: number) => Promise<void>;
    loadScheduleById: (id: number) => Promise<ScheduleResponse>;
    uploadImage: (data: any, id: number) => Promise<void>; // TODO: cambiar ANY
    handleUpdateScheduleStatus: (id_agenda: number) => Promise<void>; // TODO: cambiar ANY
}

export const ScheduleContext = createContext({} as ScheduleContextProps);

export const ScheduleProvider = ({ children }: any ) => {
    const [appointments, setAppointments] = useState<ScheduleResponse[]>([]);
    const [isFetching, setFetching] = useState<boolean>(false);
    const { user }: any = useContext(AuthContext);

    useEffect(() => {
        if(user !== null) {
            const agentId = 1;
            loadSchedule(agentId);
        }
    }, [])

    const loadSchedule = async(agentId: number) => {
        const resp: any = await ideasApi.get<ScheduleResponse>('/appointments', {
            params: { agent_id: agentId }
        });
        setAppointments(resp.data);
    }

    const addSchedule = async({ agent_id }: ScheduleData) => {
        try {
            const resp: any = await ideasApi.post<ScheduleResponse>('/appointments', { agent_id })
            setAppointments([...appointments, resp.data])
        } catch(error: any) {
            console.log(error)
        }
    }

    const updateSchedule = async(id: number, name: string, first_name: string, second_surname: string, phone: number, agentId: number) => {}

    const deleteSchedule = async(id: number) => {}

    const loadScheduleById = async(id: number) => {
        throw new Error('Not implemented');
    }

    // TODO: cambiar ANY
    const uploadImage = async(data: any, id: number) => {}

    const handleUpdateScheduleStatus = async(id_agenda: number) => {
        try {
            setFetching(true)
            const { data }: any = await ideasApi.put(`/appointments/${id_agenda}`, { "is_done": 1 })
            setFetching(false)
            if(!data)
                throw "Error al editar el registro"
            
        } catch (error) {
            console.log("From catch", error)
        }
        
    }

    return (
        <ScheduleContext.Provider value={{
            appointments,
            isFetching,
            loadSchedule,
            addSchedule,
            updateSchedule,
            deleteSchedule,
            loadScheduleById,
            uploadImage,
            handleUpdateScheduleStatus
        }}>
            { children }
        </ScheduleContext.Provider>
    )
}