import React, { useContext, useEffect, useState } from 'react';
import { Alert, Keyboard, KeyboardAvoidingView, Platform, ScrollView, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import { Navigation } from '../../helpers/interfaces/appInterfaces';
import { AuthContext } from '../../context/AuthContext';
import useForm from '../../hooks/useForm';

import CustomStatusBar from '../../components/Layout/CustomStatusBar';
import CustomButton from '../../components/CustomButton';
import CustomInput from '../../components/CustomInput';

import { colors, general, public_screens } from '../../theme/customTheme';

const RegisterScreen = ({ navigation }: Navigation) => {
    const { errorMessage, removeError, signUp } = useContext(AuthContext);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const { name, lastName, secondLastName, email, mobile, onChange } = useForm({
        name: '',
        lastName: '',
        secondLastName: '',
        mobile: '',
        email: ''
    });

    useEffect(() => {
        if(errorMessage.length === 0) return;

        Alert.alert('Registro incorrecto', errorMessage, [{
            text: 'Ok', onPress: removeError
        }]);
    }, [errorMessage])

    const onRegister = () => {
        Keyboard.dismiss();

        signUp({ name, lastName, secondLastName, email, mobile })
    }

    return (
        <>
            <CustomStatusBar />
            
            <KeyboardAvoidingView
                behavior={ (Platform.OS === 'ios') ? 'padding' : 'height' }
                style={ general.fullScreen }
            >
                <ScrollView
                    showsVerticalScrollIndicator={ false }
                    style={ general.fullScreen }
                >
                    <View style={[ general.fullScreen, general.global_margin, { flexDirection: 'column', justifyContent: 'space-around', }]}>
                        <Text style={ public_screens.subtitle_view }>
                            Bienvenido<Icon color={ colors.primary } name='square' size={ 7 } />
                        </Text>

                        <ScrollView showsVerticalScrollIndicator={ false }>
                            <CustomInput
                                onChangeText={ (value: string) => onChange(value, 'name') }
                                placeholder='Nombre'
                                value={ name }
                            />
                            
                            <CustomInput
                                onChangeText={ (value: string) => onChange(value, 'lastName') }
                                placeholder='Apellido Paterno'
                                value={ lastName }
                            />
                            
                            <CustomInput
                                onChangeText={ (value: string) => onChange(value, 'secondLastName') }
                                placeholder='Apellido Materno'
                                value={ secondLastName }
                            />

                            <CustomInput
                                onChangeText={ (value: string) => onChange(value, 'email') }
                                placeholder='Correo'
                                value={ email }
                            />

                            <CustomInput
                                onChangeText={ (value: string) => onChange(value, 'mobile') }
                                placeholder='Teléfono'
                                value={ mobile }
                            />
                            
                            <CustomButton
                                title='Empieza tu aventura'
                                onPress={ () => navigation.navigate('PrivateHome') }
                            />
                            <Text style={[ public_screens.subtitle_info, { textAlign: 'center', marginHorizontal: 30, color: colors.black }]}>
                                Al crear tu cuenta estas aceptando nuestros <Text style={ public_screens.link }>Términos de uso</Text> y <Text style={ public_screens.link }>Política de privacidad.</Text>
                            </Text>
                        </ScrollView>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </>
    )
}

export default RegisterScreen;