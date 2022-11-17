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
import { filterObj, throwAlert } from '../../helpers/tools';

import { PolicyTypeResponse } from '../../helpers/interfaces/appInterfaces';
import Autocomplete from 'react-native-autocomplete-input';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface RequestInitialState {
    error: boolean,
    message: string
    granted: boolean,
    prospects: {
        selected: Object,
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
    | { type: 'SET_SELECTED_PROSPECT', payload: { prospect: Object } }
    | { type: 'RESET_FILTERS' }

const initialState = {
    error: false,
    message: '',
    granted: false,
    prospects: {
        selected: {},
        list: [],
        filtered: [],
    },
    isFetching: false,
    policiesType: []
}

const datePickerReducer = (state: RequestInitialState = initialState, action: RequestActions): RequestInitialState => {
    switch (action.type) {
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
        case 'SET_SELECTED_PROSPECT':
            return {
                ...state,
                prospects: { ...state.prospects, selected: action.payload.prospect, filtered: [] },
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
    const [prospect, setProspect] = useState('')
    const { policyNumber, onChange } = useForm({
        prospect: '',
        policyNumber: '',
    });

    useEffect(() => {
        onInit()
    }, [])

    useEffect(() => {
        const timeOutId = setTimeout(() => handleSearchProspects(prospect), 200);
        return () => clearTimeout(timeOutId);
    }, [prospect])

    const handleSetSelectedProspect = (prospect: any) => {
        setVisibility(true);
        dispatch({ type: 'SET_SELECTED_PROSPECT', payload: { prospect } })
        setProspect(`${prospect.name} ${prospect.second_surname}`)
    }

    const handleSearchProspects = (value: string) => {
        if (value.length > 3) {
            setVisibility(false);
            const filtered = filterObj(value, 'name', state.prospects.list);
            dispatch({ type: 'SET_FILTERS', payload: { filtered } })
        } else if (value.trim().length === 0) {
            dispatch({ type: 'RESET_FILTERS' })
        }

    }

    const handleAddReques = async (prospect: string, policyType: any, policyNumber: string) => {
        try {
            const validated: any = validateRequestData(policyType, policyNumber)
            if (!validated.error) {
                dispatch({ type: 'FETCHING_DATA', payload: { isFetching: true } })
                const localStorage = await AsyncStorage.getItem('userIdeas');
                const user = localStorage != null ? JSON.parse(localStorage) : null
                const request = {
                    agent_id: user.agent_id,
                    prospect_id: state.prospects.selected.id,
                    policy_type_id: policyType,
                    policy_status_id: 1,
                    currency_type: "",
                    currency_amount: "",
                    pesos_amount: ""
                }
                const { data } = await ideasApi.post('/policies', request);
                dispatch({ type: 'FETCHING_DATA', payload: { isFetching: false } })
                if (data) {
                    clearFormData()
                    navigation.navigate('Dashboard')
                } else {
                    throwAlert("Error", "No ha sido posible guardar el registro.");
                }
            } else {
                throwAlert("Error", validated.message);
            }
        } catch (error) {
            console.log(error);
        }
    }

    const validateRequestData = (policyType: any, policyNumber: string) => {
        let result = { error: false, message: '' }

        if (Object.keys(state.prospects.selected).length === 0)
            return { error: true, message: "Es necesario que seleccione un contacto valido de la lista de opciones." }

        if (policyType === null)
            return { error: true, message: "Es necesario que seleccione un tipo de poliza." }

        if (policyNumber.trim() === '')
            return { error: true, message: "Es necesario que capture un número de póliza.." }

        return result;

    }

    const onInit = async () => {
        try {
            dispatch({ type: 'FETCHING_DATA', payload: { isFetching: true } })
            /**
             * OBTENEMOS EL LISTADO DE PROSPECTOS
             */
            const localStorage = await AsyncStorage.getItem('userIdeas');
            const user = localStorage != null ? JSON.parse(localStorage) : null
            const { data: prospects }: any = await ideasApi.get<ProspectsResponse>(`/prospects`, {
                params: { agent_id: user.agent_id }
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

    const clearFormData = () => {
        setPolicyType(null)
        setProspect('')
        onChange('', 'policyNumber')
    }

    return (
        <KeyboardAvoidingView
            behavior={(Platform.OS === 'ios') ? 'padding' : 'height'}
            style={general.fullScreen}
        >
            <CustomHeader
                isHome={true}
                navigation={navigation}
                title='SOLICITUDES'
            />

            {state.isFetching
                ? <ActivityIndicator size="small" color="#0000ff" />
                : <ScrollView
                    showsVerticalScrollIndicator={false}
                    style={[general.global_margin, { marginVertical: 33, }]}
                >
                    <View>
                        <Text style={{ fontSize: 20, marginBottom: 10 }}>Contácto</Text>
                        <Autocomplete
                            hideResults={visibility}
                            data={state.prospects.filtered}
                            value={prospect}
                            onChangeText={(value: string) => setProspect(value)}
                            containerStyle={{ marginBottom: 15 }}
                            flatListProps={{
                                keyExtractor: (_: any, idx: any) => idx,
                                renderItem: ({ item }: any) => {
                                    return (<TouchableOpacity
                                        onPress={() => handleSetSelectedProspect(item)}
                                        style={{ height: 40, alignItems: 'center', justifyContent: 'center' }}
                                    >
                                        <Text style={{ fontSize: 20 }}>{item.name} {item.second_surname}</Text>
                                    </TouchableOpacity>)
                                },
                            }}
                        />
                    </View>
                    <Text style={{ fontSize: 20, marginBottom: 10 }}>Tipo de solicitud</Text>
                    <DropDownPicker
                        open={open}
                        placeholder={'Seleccione una opción'}
                        placeholderStyle={{color: 'gray'}}
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
                    <Text style={{ fontSize: 20, marginBottom: 10 }}>Número de póliza</Text>
                    <CustomInput
                        onChangeText={(value: string) => onChange(value, 'policyNumber')}
                        placeholder='Número de póliza'
                        value={policyNumber}
                    />
                    <CustomButton
                        onPress={() => handleAddReques(prospect, policyType, policyNumber)}
                        title='Agregar'
                    />
                </ScrollView>}
        </KeyboardAvoidingView>
    )
}

export default RequestScreen;


const styles = StyleSheet.create({})