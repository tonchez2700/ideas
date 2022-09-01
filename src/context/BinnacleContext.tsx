import React, { createContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import ideasApi from '../api/ideasApi';

import { BinnacleResponse } from '../helpers/interfaces/appInterfaces';

type BinnacleContextProps = {
    binnacleList: BinnacleResponse[];
    fetchBinnacle: () => Promise<any>;
}

export const BinnacleContext = createContext({} as BinnacleContextProps);

export const BinnacleProvider = ({ children }: any ) => {
    const [binnacleList, setBinnacleList] = useState<BinnacleResponse[]>([]);

    const fetchBinnacle = async() => {
    
        const localStorage = await AsyncStorage.getItem('userIdeas');
        const user = localStorage != null ? JSON.parse(localStorage) : null

        const resp: any = await ideasApi.get<BinnacleResponse>(`/agents/getbinnacle/${user.id}`);

        setBinnacleList(resp.data);
    }

    return (
        <BinnacleContext.Provider value={{
            binnacleList,
            fetchBinnacle
        }}>
            { children }
        </BinnacleContext.Provider>
    )
}