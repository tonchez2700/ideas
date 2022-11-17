import React, { createContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ideasApi from '../api/ideasApi';
import { BinnacleResponse } from '../helpers/interfaces/appInterfaces';
import moment from 'moment'

type BinnacleContextProps = {
    binnacleList: BinnacleResponse[];
    fetchBinnacle: () => Promise<any>;
}

export const BinnacleContext = createContext({} as BinnacleContextProps);

export const BinnacleProvider = ({ children }: any) => {
    const [binnacleList, setBinnacleList] = useState<BinnacleResponse[]>([]);

    const fetchBinnacle = async () => {
        const now = new Date();
        var first = now.getDate() - now.getDay(); // First day is the day of the month - the day of the week
        var last = first + 6; // last day is the first day + 6

        var firstday1 = new Date(now.setDate(first + 1))
        var lastday1 = new Date(now.setDate(last  + 1))
        const firstDay = new Date(now.getFullYear(), now.getMonth(), 1,);
        const initial_date = moment(firstday1).format('YYYY-MM-DD')
        const lastDay = new Date(now.getFullYear(), now.getMonth() + 1, 0);
        const full_final_date = moment(lastday1).format('YYYY-MM-DD')
        const localStorage = await AsyncStorage.getItem('userIdeas');
        const user = localStorage != null ? JSON.parse(localStorage) : null
        const resp: any = await ideasApi.get<BinnacleResponse>(`/agents/getbinnacleall/${user.agent_id}?initial_date=${initial_date}&final_date=${full_final_date}`);
        setBinnacleList(resp.data);
        
    }

    return (
        <BinnacleContext.Provider value={{
            binnacleList,
            fetchBinnacle
        }}>
            {children}
        </BinnacleContext.Provider>
    )
}