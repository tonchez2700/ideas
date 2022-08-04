import React from 'react';
import { KeyboardAvoidingView, Platform, ScrollView } from 'react-native';

import { Navigation } from '../../helpers/interfaces/appInterfaces';
import useForm from '../../hooks/useForm';

import { CustomHeader } from '../../components/Layout/CustomHeader';
import CustomButton from '../../components/CustomButton';
import CustomInput from '../../components/CustomInput';

import { general } from '../../theme/customTheme';

const RequestScreen = ({ navigation }: Navigation) => {
    const { contact, policyType, policyNumber, onChange } = useForm({
        contact: '',
        policyType: '',
        policyNumber: '',
    });

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

            <ScrollView
                showsVerticalScrollIndicator={ false }
                style={[ general.global_margin, { marginVertical: 33, }]}
            >
                <CustomInput
                    onChangeText={ (value: string) => onChange(value, 'contact') }
                    placeholder='Contacto'
                    value={ contact }
                />
                <CustomInput
                    onChangeText={ (value: string) => onChange(value, 'policyType') }
                    placeholder='Tipo de póliza'
                    value={ policyType }
                />
                <CustomInput
                    onChangeText={ (value: string) => onChange(value, 'policyNumber') }
                    placeholder='Número de póliza'
                    value={ policyNumber }
                />
                <CustomButton
                    title='Agregar'
                />
            </ScrollView>
        </KeyboardAvoidingView>
    )
}

export default RequestScreen;