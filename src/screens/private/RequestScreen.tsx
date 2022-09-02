import React, { useState, useReducer, useEffect } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, ActivityIndicator } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';

import { Navigation } from '../../helpers/interfaces/appInterfaces';
import useForm from '../../hooks/useForm';

import ideasApi from '../../api/ideasApi';

import { CustomHeader } from '../../components/Layout/CustomHeader';
import CustomButton from '../../components/CustomButton';
import CustomInput from '../../components/CustomInput';

import { general } from '../../theme/customTheme';

import { PolicyTypeResponse } from '../../helpers/interfaces/appInterfaces';

interface RequestInitialState { 
    isFetching: boolean
    policyTypeList: Array<T>
};

type RequestActions =
    | { type: 'FETCHING_DATA', payload: { isFetching: boolean } }
    | { type: 'SET_POLICY_TYPE_LIST', payload: { policyTypeList: Array<T> } }

const initialState = {
    isFetching: false,
    policyTypeList: []
}

const datePickerReducer = (state: RequestInitialState = initialState, action: RequestActions): RequestInitialState => {
    switch(action.type){
        case 'FETCHING_DATA':
            return {
                ...state,
                isFetching: action.payload.isFetching
            }
        case 'SET_POLICY_TYPE_LIST':
            return {
                ...state,
                isFetching: false,
                policyTypeList: action.payload.policyTypeList
            }
        default:
            return state
    }
}

const RequestScreen = ({ navigation }: Navigation) => {
    const [state, dispatch] = useReducer(datePickerReducer, initialState);

    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [items, setItems] = useState([
        {label: 'Apple', value: 'apple'},
        {label: 'Banana', value: 'banana'}
    ]);

    useEffect(() => {
        onInit()
    }, [])

    const { contact, policyType, policyNumber, onChange } = useForm({
        contact: '',
        policyType: '',
        policyNumber: '',
    });
    
    const handleAddRequest = () => {
        dispatch({ type: 'FETCHING_DATA', payload: { isFetching: true }  })
    }

    const onInit = async() => {
        dispatch({ type: 'FETCHING_DATA', payload: { isFetching: true }  })
        const { data }: any = await ideasApi.get<PolicyTypeResponse>(`/policy_types`);
        let list: any[] = []
        data.map((item: any, i: number) => {
            list = [ 
                ...list, 
                {
                    label: item.name,
                    value: item.id
                }
            ]
        })
        dispatch({ type: 'SET_POLICY_TYPE_LIST', payload: { policyTypeList: list }  })
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
                    <CustomInput
                        onChangeText={ (value: string) => onChange(value, 'contact') }
                        placeholder='Contacto'
                        value={ contact }
                    />
                    <DropDownPicker
                        open={open}
                        value={value}
                        items={state.policyTypeList}
                        setOpen={setOpen}
                        setValue={setValue}
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
                        // onPress={ handleAddRequest }
                        title='Agregar'
                    />
                </ScrollView>}
        </KeyboardAvoidingView>
    )
}

export default RequestScreen;