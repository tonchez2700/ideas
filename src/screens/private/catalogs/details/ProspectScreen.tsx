import React, { useContext, useEffect, useState } from 'react';
import { Keyboard, KeyboardAvoidingView, LogBox, Platform, ScrollView, View, Text } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import ideasApi from '../../../../api/ideasApi';
import DropDownPicker from 'react-native-dropdown-picker';
import useForm from '../../../../hooks/useForm';
import { ProspectsContext } from '../../../../context/ProspectsContext';

import { CustomHeader } from '../../../../components/Layout/CustomHeader';
import CustomButton from '../../../../components/CustomButton';
import CustomInput from '../../../../components/CustomInput';

import { general } from '../../../../theme/customTheme';

interface Props extends NativeStackScreenProps<any, any> { };

const ProspectScreen = ({ route, navigation }: Props) => {
    const item = route.params;
    const [open, setOpen] = useState(false);
    const [TypeCat, setTypeCat] = useState<any>([]);
    const [appointmentType, setAppointmentType] = useState(null);
    const [policyType, setPolicyType] = useState(null);
    const { addProspect } = useContext(ProspectsContext);
    const { name, first_name, second_surname, phone, policy_type_id, onChange } = useForm({
        name: '',
        first_name: '',
        second_surname: '',
        phone: '',
        policy_type_id: '',
    });

    const onInit = async () => {

        /**
         * OBTENEMOS EL LISTADO TIPOS DE POLIZA
         */
        const { data: appointmentTypes }: any = await ideasApi.get(`/policy_types`);
        let list: any[] = []
        appointmentTypes.map((item: any, i: number) => {
            list = [
                ...list,
                {
                    label: item.name,
                    value: item.id
                }
            ]
        })

        setTypeCat(list)
    }
    useEffect(() => {
        onInit()
    }, [])
    useEffect(() => {
        LogBox.ignoreLogs(["Non-serializable values were found in the navigation state"])
    }, [])

    const onAddProspect = () => {
        Keyboard.dismiss();

        addProspect({ name, first_name, second_surname, phone, policy_type_id, agent_id: item })

        navigation.goBack();
    }

    return (
        <KeyboardAvoidingView
            behavior={(Platform.OS === 'ios') ? 'padding' : 'height'}
            style={general.fullScreen}
        >
            <CustomHeader
                isHome={false}
                navigation={navigation}
            />

            <ScrollView
                showsVerticalScrollIndicator={false}
                style={[general.global_margin, { marginVertical: 33, }]}
            >
                <CustomInput
                    autoCapitalize='words'
                    onChangeText={(value: string) => onChange(value, 'name')}
                    placeholder='Nombre'
                    value={name}
                />
                <CustomInput
                    autoCapitalize='words'
                    onChangeText={(value: string) => onChange(value, 'first_name')}
                    placeholder='Apellido Paterno'
                    value={first_name}
                />
                <CustomInput
                    autoCapitalize='words'
                    onChangeText={(value: string) => onChange(value, 'second_surname')}
                    placeholder='Apellido Materno'
                    value={second_surname}
                />
                <CustomInput
                    keyboardType='numeric'
                    onChangeText={(value: string) => onChange(value, 'phone')}
                    placeholder='Teléfono'
                    value={phone}
                />
                <View>
                    <Text style={{ fontSize: 20, marginBottom: 10 }}>Tipo</Text>
                    <DropDownPicker
                        open={open}
                        value={policyType}
                        items={TypeCat}
                        placeholder="Seleccione una opción"
                        placeholderStyle={{color: 'gray'}}
                        setOpen={setOpen}
                        onChangeValue={(value: number | any) => onChange(value, 'policy_type_id')}
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
                </View>
                <CustomButton
                    onPress={onAddProspect}
                    title='Agregar'
                />
            </ScrollView>
        </KeyboardAvoidingView>
    )
}

export default ProspectScreen;