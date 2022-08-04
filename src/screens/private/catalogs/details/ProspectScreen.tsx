import React, { useContext, useEffect } from 'react';
import { Keyboard, KeyboardAvoidingView, LogBox, Platform, ScrollView } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import useForm from '../../../../hooks/useForm';
import { ProspectsContext } from '../../../../context/ProspectsContext';

import { CustomHeader } from '../../../../components/Layout/CustomHeader';
import CustomButton from '../../../../components/CustomButton';
import CustomInput from '../../../../components/CustomInput';

import { general } from '../../../../theme/customTheme';

interface Props extends NativeStackScreenProps<any, any>{};

const ProspectScreen = ({ route, navigation }: Props) => {
    const item = route.params;

    const { addProspect } = useContext(ProspectsContext);
    const { name, first_name, second_surname, phone, onChange } = useForm({
        name: '',
        first_name: '',
        second_surname: '',
        phone: '',
    });

    useEffect(() => {
        LogBox.ignoreLogs(["Non-serializable values were found in the navigation state"])
    }, [])
    
    const onAddProspect = () => {
        Keyboard.dismiss();

        addProspect({ name, first_name, second_surname, phone, agent_id: item })

        navigation.goBack();
    }

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
                    autoCapitalize='words'
                    onChangeText={ (value: string) => onChange(value, 'name') }
                    placeholder='Nombre'
                    value={ name }
                />
                <CustomInput
                    autoCapitalize='words'
                    onChangeText={ (value: string) => onChange(value, 'first_name') }
                    placeholder='Apellido Paterno'
                    value={ first_name }
                />
                <CustomInput
                    autoCapitalize='words'
                    onChangeText={ (value: string) => onChange(value, 'second_surname') }
                    placeholder='Apellido Paterno'
                    value={ second_surname }
                />
                <CustomInput
                    keyboardType='numeric'
                    onChangeText={ (value: string) => onChange(value, 'phone') }
                    placeholder='Teléfono'
                    value={ phone }
                />
                <CustomButton
                    onPress={ onAddProspect }
                    title='Agregar'
                />
            </ScrollView>
        </KeyboardAvoidingView>
    )
}

export default ProspectScreen;