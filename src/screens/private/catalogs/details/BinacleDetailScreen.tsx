import React, { useEffect } from 'react';
import { KeyboardAvoidingView, LogBox, Platform, ScrollView, StyleSheet, } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import useForm from '../../../../hooks/useForm';

import { CustomHeader } from '../../../../components/Layout/CustomHeader';
import CustomButton from '../../../../components/CustomButton';
import CustomInput from '../../../../components/CustomInput';

import { colors, general } from '../../../../theme/customTheme';

interface Props extends NativeStackScreenProps<any, any>{};

const BinacleDetailScreen = ({ route, navigation }: Props) => {
    const { name, phone, onChange } = useForm({
        name: '',
        phone: '',
    });
    const data = route.params;

    useEffect(() => {
        LogBox.ignoreLogs(["Non-serializable values were found in the navigation state"])
    }, [])
    
    return (
        <KeyboardAvoidingView
            behavior={ (Platform.OS === 'ios') ? 'padding' : 'height' }
            style={ general.fullScreen }
        >
            <CustomHeader
                isHome={ false }
                navigation={ navigation }
            />

            <ScrollView
                showsVerticalScrollIndicator={ false }
                style={[ general.global_margin, { marginVertical: 33, }]}
            >
                <CustomInput
                    onChangeText={ (value: string) => onChange(value, 'name') }
                    placeholder='Nombre'
                    value={ name }
                />
                <CustomInput
                    keyboardType='numeric'
                    onChangeText={ (value: string) => onChange(value, 'phone') }
                    placeholder='Teléfono'
                    value={ phone }
                />      
                <CustomButton
                    title='Agregar'
                />
                        
                <CustomButton
                    title='Importar Contacto'
                    type='SECONDARY'
                />
            </ScrollView>
        </KeyboardAvoidingView>
    )
}

export default BinacleDetailScreen;

const book = StyleSheet.create({
    title: {
        color: colors.black,
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    subtitle: {
        color: colors.black,
        fontSize: 20,
        fontStyle: 'italic',
        marginBottom: 20,
    },
    text: {
        color: colors.gray_opacity,
        fontSize: 20,
        marginBottom: 20,
    },
})