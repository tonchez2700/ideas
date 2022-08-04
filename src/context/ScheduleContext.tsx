import React, { createContext, useContext, useEffect, useState } from 'react';

import ideasApi from '../api/ideasApi';
import { AuthContext } from './AuthContext';

import { ScheduleData, ScheduleResponse } from '../helpers/interfaces/appInterfaces';

type ScheduleContextProps = {
    appointments: ScheduleResponse[];
    loadSchedule: (agentId: number) => Promise<void>;
    addSchedule: (ScheduleData: ScheduleData) => Promise<void>;
    updateSchedule: (id: number, name: string, first_name: string, second_surname: string, phone: number, agentId: number) => Promise<void>;
    deleteSchedule: (id: number) => Promise<void>;
    loadScheduleById: (id: number) => Promise<ScheduleResponse>;
    uploadImage: (data: any, id: number) => Promise<void>; // TODO: cambiar ANY
}

export const ScheduleContext = createContext({} as ScheduleContextProps);

export const ScheduleProvider = ({ children }: any ) => {
    const [appointments, setAppointments] = useState<ScheduleResponse[]>([]);
    const { user }: any = useContext(AuthContext);

    useEffect(() => {
        if(user !== null) {
            const agentId = 1;
            loadSchedule(agentId);
        }
    }, [])
    console.log(appointments)

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
            console.log('Si paso')
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

    return (
        <ScheduleContext.Provider value={{
            appointments,
            loadSchedule,
            addSchedule,
            updateSchedule,
            deleteSchedule,
            loadScheduleById,
            uploadImage,
        }}>
            { children }
        </ScheduleContext.Provider>
    )
}