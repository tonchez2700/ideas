import React, { createContext, useEffect, useReducer } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { AuthReducer, AuthState } from '../reducers/authReducer';

import ideasApi from '../api/ideasApi';
import { LoginResponse, LoginData, RefreshTokenResponse, User } from '../helpers/interfaces/appInterfaces';

type AuthContextProps = {
    errorMessage: string;
    status: 'checking' | 'authenticated' | 'no-authenticated';
    token: any | null;
    user: User | null;
    expires_at: Date | null;

    removeError: () => void;
    signIn: (LoginData: LoginData) => void;
    logout: () => void;
}

const authInitialState: AuthState = {
    errorMessage: '',
    status: 'checking',
    token: null,
    user: null,
    expires_at: null
}

export const AuthContext = createContext({} as AuthContextProps);

export const AuthProvider = ({ children }: any) => {
    const [state, dispatch] = useReducer(AuthReducer, authInitialState);

    useEffect(() => {
        checkToken();
    }, [])

    const checkToken = async() => {
        try {
            const token = await AsyncStorage.getItem('token');

            if(!token) return dispatch({ type: 'notAuthenticated' });
            
            const { data } = await ideasApi.get<RefreshTokenResponse>('/auth/refreshtoken');
         
            console.log(data);
            
            if(data.status !== true) {
                dispatch({ type: 'notAuthenticated' })
            } else {
                dispatch({
                    type: 'refreshToken',
                    payload: {
                        expires_at: data.expires_at
                    }
                })
            }
        } catch (error: any) {
            
            dispatch({ 
                type: 'addError', 
                payload: error.response.data.msg || 'Información incorrecta'
            })
        }
    }

    const signIn = async({ email, password }: LoginData) => {
        try {
            const { data } = await ideasApi.post<LoginResponse>('/auth/login', { email, password });
            dispatch({
                type: 'singUp',
                payload: {
                    token: data.token,
                    user: data.user,
                    expires_at: data.expires_at
                }
            });

            if(data.token !== null) {
                await AsyncStorage.setItem('token', data.token);
                await AsyncStorage.setItem('userIdeas', JSON.stringify(data.user));
            }
        } catch(error: any) {
            dispatch({
                type: 'addError',
                payload: error.response.data.message || 'Información incorrecta'
            })
        }
    }

    const logout = async() => {
        await AsyncStorage.removeItem('token');
        await AsyncStorage.removeItem('userIdeas');
        dispatch({ type: 'logout' })
    }

    const removeError = () => {
        dispatch({ type: 'removeError' })
    }

    return (
        <AuthContext.Provider value={{
            ...state,
            removeError,
            logout,
            signIn
        }}>
            { children }
        </AuthContext.Provider>
    )
}
