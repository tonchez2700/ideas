import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

import * as constants from '../api/constants';

const useFetch = (url: string, method: any, params?: any) => {
    const [response, setResponse] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchData();
    }, [])

    const fetchData = async () => {
        const token = await AsyncStorage.getItem('token');
        
        axios(constants.BASE_URL + url, {
            method: method,
            headers: {
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + token,
                'Content-Type': 'application/json'
            },
            params
        })
        .then(res => {
            const data: any = res.data;
            setResponse(data);
        })
        .catch(err => setError(err));
    }

    return ({ error, response })
}

export default useFetch;