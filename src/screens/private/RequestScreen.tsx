import React, { useState, useReducer, useEffect } from 'react';
import { StyleSheet, View, Text, KeyboardAvoidingView, Platform, ScrollView, ActivityIndicator, TouchableOpacity } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';

import { Navigation } from '../../helpers/interfaces/appInterfaces';
import useForm from '../../hooks/useForm';

import ideasApi from '../../api/ideasApi';

import { CustomHeader } from '../../components/Layout/CustomHeader';
import CustomButton from '../../components/CustomButton';
import CustomInput from '../../components/CustomInput';

import { general } from '../../theme/customTheme';
import { filterObj } from '../../helpers/tools';

import { PolicyTypeResponse } from '../../helpers/interfaces/appInterfaces';
import Autocomplete from 'react-native-autocomplete-input';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface RequestInitialState {
    error: boolean,
    message: string
    granted: boolean,
    prospects: {
        list: Array<any>,
        filtered: Array<any>,
    },
    isFetching: boolean
    policiesType: Array<T>
};

type RequestActions =
    | { type: 'SET_ERROR_STATE', payload: { error: boolean, message: string } }
    | { type: 'FETCHING_DATA', payload: { isFetching: boolean } }
    | { type: 'SET_INITIAL_DATA', payload: { prospects: Array<any>, policiesType: Array<any> } }
    | { type: 'SET_FILTERS', payload: { filtered: Array<any> } }
    | { type: 'RESET_FILTERS' }

const initialState = {
    error: false,
    message: '',
    granted: false,
    prospects: {
        list: [],
        filtered: [],
    },
    isFetching: false,
    policiesType: []
}

const datePickerReducer = (state: RequestInitialState = initialState, action: RequestActions): RequestInitialState => {
    switch(action.type){
        case 'FETCHING_DATA':
            return {
                ...state,
                isFetching: action.payload.isFetching
            }
        case 'SET_ERROR_STATE':
            return {
                ...state,
                isFetching: false,
                error: action.payload.error,
                message: action.payload.message
            }
        case 'SET_FILTERS':
            return {
                ...state,
                prospects: { ...state.prospects, filtered: action.payload.filtered },
            }
        case 'RESET_FILTERS':
            return {
                ...state,
                prospects: { ...state.prospects, filtered: [] },
            }
        case 'SET_INITIAL_DATA':
            return {
                ...state,
                granted: true,
                isFetching: false,
                prospects: { ...state.prospects, list: action.payload.prospects },
                policiesType: action.payload.policiesType
            }
        default:
            return state
    }
}

const RequestScreen = ({ navigation }: Navigation) => {
    const [state, dispatch] = useReducer(datePickerReducer, initialState);

    const [open, setOpen] = useState(false);
    const [visibility, setVisibility] = useState(false);
    const [policyType, setPolicyType] = useState(null);

    const { prospect, policyNumber, onChange } = useForm({
        prospect: '',
        policyNumber: '',
    });

    useEffect(() => {
        onInit()
    }, [])

    useEffect(() => {
        const timeOutId = setTimeout(() => handleSearchProspects(prospect), 800);
        return () => clearTimeout(timeOutId);
    }, [prospect])
    
    const handleSetSelectedProspect = (prospect: any) => {
        setVisibility(true);
        onChange(`${prospect.name} ${prospect.second_surname}`, 'prospect')
    }

    const handleSearchProspects = (value: string) => {
        if(value.length > 3){
            setVisibility(false);
            const filtered = filterObj(value, 'name', state.prospects.list);
            if(filtered.length > 0){
                dispatch({ type: 'SET_FILTERS', payload: { filtered }  })
            }
        }else if(value.trim().length === 0){
            dispatch({ type: 'RESET_FILTERS' })
        }
        
    }

    const handleAddReques = (prospect: string, policyType: any, policyNumber: string) => {
        console.log(prospect, policyType, policyNumber);
    }

    const onInit = async() => {
        try {
            dispatch({ type: 'FETCHING_DATA', payload: { isFetching: true }  })
            /**
             * OBTENEMOS EL LISTADO DE PROSPECTOS
             */
            const localStorage = await AsyncStorage.getItem('userIdeas');
            const user = localStorage != null ? JSON.parse(localStorage) : null
            const { data: prospects }: any = await ideasApi.get<ProspectsResponse>(`/prospects`, {
                params: { agent_id: user.id }
            });

            /**
             * OBTENEMOS EL LISTADO TIPOS DE POLIZA
             */
            const { data: policiesType }: any = await ideasApi.get<PolicyTypeResponse>(`/policy_types`);
            let list: any[] = []
            policiesType.map((item: any, i: number) => {
                list = [ 
                    ...list, 
                    {
                        label: item.name,
                        value: item.id
                    }
                ]
            })
            dispatch({ 
                type: 'SET_INITIAL_DATA', 
                payload: { 
                    prospects,
                    policiesType: list
                }  
            })
        } catch (error) {
            dispatch({ 
                type: 'SET_ERROR_STATE', 
                payload: { 
                    error: true,
                    message: "Por el momento el servicio no esta disponible, favor de intentarlo mas tarde."
                }  
            })
        }
        
        
        
    }

    return (
        <KeyboardAvoidingView
            behavior={ (Platform.OS === 'ios') ? 'padding' : 'height' }
            style={ general.fullScreen }
        >
            <CustomHeader
                isHome={ true }
                navigation={ navigation }
                title='SOLICITUDES'
            />

            {state.isFetching
            ?   <ActivityIndicator size="small" color="#0000ff" />
            :   <ScrollView
                    showsVerticalScrollIndicator={ false }
                    style={[ general.global_margin, { marginVertical: 33, }]}
                >
                    <View>
                        <Autocomplete
                            hideResults={visibility}
                            data={state.prospects.filtered}
                            value={prospect}
                            onChangeText={(value: string) => onChange(value, 'prospect')}
                            containerStyle={{ marginBottom: 15 }}
                            flatListProps={{
                                keyExtractor: (_: any, idx: any) => idx,
                                renderItem: ({ item }: any) => {
                                    return (<TouchableOpacity
                                        onPress={ () => handleSetSelectedProspect(item) }
                                        style={{ height: 40, alignItems: 'center', justifyContent: 'center' }}
                                    >
                                        <Text style={{ fontSize: 20 }}>{item.name} {item.second_surname}</Text>
                                    </TouchableOpacity>)
                                },
                            }}
                        />
                    </View>
                    <DropDownPicker
                        open={open}
                        value={policyType}
                        items={state.policiesType}
                        setOpen={setOpen}
                        setValue={setPolicyType}
                        style={{
                            borderColor: 'transparent',
                            marginBottom: 20,
                        }}
                        textStyle={{
                            fontSize: 20,
                            color: '#23233C'
                        }}
                    />
                    <CustomInput
                        onChangeText={ (value: string) => onChange(value, 'policyNumber') }
                        placeholder='Número de póliza'
                        value={ policyNumber }
                    />
                    <CustomButton
                        onPress={ () => handleAddReques(prospect, policyType, policyNumber) }
                        title='Agregar'
                    />
                </ScrollView>}
        </KeyboardAvoidingView>
    )
}

export default RequestScreen;


const styles = StyleSheet.create({})