import React, { createContext, useContext, useEffect, useState } from 'react';

import ideasApi from '../api/ideasApi';
import { AuthContext } from './AuthContext';

import { AgentData, ProspectsResponse } from '../helpers/interfaces/appInterfaces';

type ProspectsContextProps = {
    prospects: ProspectsResponse[];
    loadProspects: (agentId: number) => Promise<void>;
    addProspect: (AgentData: AgentData) => Promise<void>;
    updateProspect: (id: number, name: string, first_name: string, second_surname: string, phone: number, agentId: number) => Promise<void>;
    deleteProspect: (id: number) => Promise<void>;
    loadProspectById: (id: number) => Promise<ProspectsResponse>;
    uploadImage: (data: any, id: number) => Promise<void>; // TODO: cambiar ANY
}

export const ProspectsContext = createContext({} as ProspectsContextProps);

export const ProspectsProvider = ({ children }: any ) => {
    const [prospects, setProspects] = useState<ProspectsResponse[]>([]);
    const { user }: any = useContext(AuthContext);
    const agentId = user?.id;

    useEffect(() => {
        if(user !== null) {
            loadProspects(agentId);
        }
    }, [prospects])

    const loadProspects = async(agentId: number) => {
        const resp: any = await ideasApi.get<ProspectsResponse>('/prospects', {
            params: { agent_id: agentId }
        });
        setProspects(resp.data);
    }

    const addProspect = async({ name, first_name, second_surname, phone, agent_id }: AgentData) => {
        try {
            const resp: any = await ideasApi.post<ProspectsResponse>('/prospects', { name, first_name, second_surname, phone, agent_id })
            setProspects([...prospects, resp.data])
            console.log('Si paso')
        } catch(error: any) {
            console.log(error)
        }
    }

    const updateProspect = async(id: number, name: string, first_name: string, second_surname: string, phone: number, agentId: number) => {}

    const deleteProspect = async(id: number) => {}

    const loadProspectById = async(id: number) => {
        throw new Error('Not implemented');
    }

    // TODO: cambiar ANY
    const uploadImage = async(data: any, id: number) => {}

    return (
        <ProspectsContext.Provider value={{
            prospects,
            loadProspects,
            addProspect,
            updateProspect,
            deleteProspect,
            loadProspectById,
            uploadImage,
        }}>
            { children }
        </ProspectsContext.Provider>
    )
}