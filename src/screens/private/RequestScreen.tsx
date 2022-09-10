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
import * as Contacts from 'expo-contacts';
import Autocomplete from 'react-native-autocomplete-input';

interface RequestInitialState {
    granted: boolean,
    contacts: {
        list: Array<any>,
        filtered: Array<any>,
    },
    isFetching: boolean
    policiesType: Array<T>
};

type RequestActions =
    | { type: 'FETCHING_DATA', payload: { isFetching: boolean } }
    | { type: 'SET_INITIAL_DATA', payload: { contacts: Array<any>, policiesType: Array<any> } }
    | { type: 'SET_FILTERS', payload: { filtered: Array<any> } }
    | { type: 'RESET_FILTERS' }

const initialState = {
    granted: false,
    contacts: {
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
        case 'SET_FILTERS':
            return {
                ...state,
                contacts: { ...state.contacts, filtered: action.payload.filtered },
            }
        case 'RESET_FILTERS':
            return {
                ...state,
                contacts: { ...state.contacts, filtered: [] },
            }
        case 'SET_INITIAL_DATA':
            return {
                ...state,
                granted: true,
                isFetching: false,
                contacts: { ...state.contacts, list: action.payload.contacts },
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
    const [value, setValue] = useState(null);
    const [items, setItems] = useState([
        {label: 'Apple', value: 'apple'},
        {label: 'Banana', value: 'banana'}
    ]);

    const { contact, policyType, policyNumber, onChange } = useForm({
        contact: '',
        policyType: '',
        policyNumber: '',
    });

    useEffect(() => {
        onInit()
    }, [])

    useEffect(() => {
        const timeOutId = setTimeout(() => handleSearchContacts(contact), 800);
        return () => clearTimeout(timeOutId);
    }, [contact])
    
    const handlesetSelectedContact = (contact: any) => {
        setVisibility(true);
        onChange(`${contact.firstName} ${contact.lastName}`, 'contact')
    }

    const handleSearchContacts = (value: string) => {
        if(value.length > 3){
            console.log("se ejecuto")
            setVisibility(false);
            const filtered = filterObj(value, 'firstName', state.contacts.list);
            dispatch({ type: 'SET_FILTERS', payload: { filtered }  })
        }else if(value.trim().length === 0){
            dispatch({ type: 'RESET_FILTERS' })
        }
        
    }

    const onInit = async() => {
        dispatch({ type: 'FETCHING_DATA', payload: { isFetching: true }  })
        const { status } = await Contacts.requestPermissionsAsync();
        if (status === 'granted') {
            /**
             * OBTENEMOS EL LISTADO DE CONTACTOS DEL TELEFONO
             */
            const { data: contacts } = await Contacts.getContactsAsync({
                fields: [Contacts.Fields.FirstName],
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
                    contacts,
                    policiesType: list
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
                            data={state.contacts.filtered}
                            value={contact}
                            onChangeText={(value: string) => onChange(value, 'contact')}
                            containerStyle={{ marginBottom: 15 }}
                            flatListProps={{
                                keyExtractor: (_: any, idx: any) => idx,
                                renderItem: ({ item }: any) => (
                                    <TouchableOpacity
                                        onPress={ () => handlesetSelectedContact(item) }
                                        style={{ height: 40, alignItems: 'center', justifyContent: 'center' }}
                                    >
                                        <Text style={{ fontSize: 20 }}>{item.firstName} {item.lastName}</Text>
                                    </TouchableOpacity>
                                ),
                            }}
                        />
                    </View>
                    <DropDownPicker
                        open={open}
                        value={value}
                        items={state.policiesType}
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


const styles = StyleSheet.create({})