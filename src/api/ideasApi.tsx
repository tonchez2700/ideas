import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

import * as constants from './constants'
const baseURL = constants.BASE_URL;

const ideasApi = axios.create({ baseURL });

ideasApi.interceptors.request.use(
    async(config) => {
        const token = 'Bearer ' + await AsyncStorage.getItem('token');
        if(token) {
            config.headers = {
                Authorization: token
            }
        }
        return config;
    }
)

export default ideasApi;