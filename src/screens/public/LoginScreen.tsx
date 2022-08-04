import React, { useContext, useEffect, useState } from 'react';
import { Alert, Keyboard, KeyboardAvoidingView, Image, Platform, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Modal from 'react-native-modal'

import { AuthContext } from '../../context/AuthContext';
import useForm from '../../hooks/useForm';

import CustomStatusBar from '../../components/Layout/CustomStatusBar';
import CustomButton from '../../components/CustomButton';
import CustomInput from '../../components/CustomInput';

import { colors, general, public_screens } from '../../theme/customTheme';

const LoginScreen = () => {
    const { errorMessage, removeError, signIn } = useContext(AuthContext);
    const [showPassword, setShowPassword] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    
    const { email, password, recoverPassword, onChange } = useForm({
        email: '',
        password: '',
        recoverPassword: ''
    });

    useEffect(() => {
        if(errorMessage.length === 0) return;

        Alert.alert('Login incorrecto', errorMessage, [{
            text: 'Ok', onPress: removeError
        }]);
    }, [errorMessage])
    
    const onLogin = () => {
        Keyboard.dismiss();

        signIn({ email, password });
    }

    const closeModal = () => {
        setModalVisible(!modalVisible)
    }

    return (
        <>
            <CustomStatusBar />
            
            <View style={ general.fullScreen }>
                <Modal
                    hasBackdrop={ true }
                    isVisible={ modalVisible }
                    onBackdropPress={ closeModal }
                    onBackButtonPress={ closeModal }
                >
                    <View style={ styles.centered_view }>
                        <View style={ styles.modal_view }>
                            <Text style={ public_screens.subtitle_view }>
                                Recuperar contraseña<Icon color={ colors.primary } name='square' size={ 7 } />
                            </Text>
                            <View style={ styles.container_modal }>
                                <CustomInput
                                    keyboardType='email-address'
                                    icon='mail-outline'
                                    onChangeText={ (value: string) => onChange(value, 'recoverPassword') }
                                    placeholder='Correo'
                                    type='SECONDARY'
                                    value={ recoverPassword }
                                />
                                <CustomButton
                                    title='Enviar'
                                />
                            </View>
                        </View>
                    </View>
                </Modal>
                <ScrollView
                    showsVerticalScrollIndicator={ false }
                    style={ general.fullScreen }
                >
                    <Image
                        resizeMode='stretch'
                        source={ require('../../assets/images/bgLogin.png') }
                        style={ general.backgroundImage }
                    />

                    <View style={[ general.global_margin, { flexDirection: 'column', justifyContent: 'space-around', }]}>
                        <Text style={ public_screens.subtitle_view }>
                            Bienvenido<Icon color={ colors.primary } name='square' size={ 7 } />
                        </Text>

                        <KeyboardAvoidingView behavior={ (Platform.OS === 'ios') ? 'padding' : 'height' }>
                            <CustomInput
                                keyboardType='email-address'
                                icon='mail-outline'
                                onChangeText={ (value: string) => onChange(value, 'email') }
                                placeholder='Correo'
                                value={ email }
                            />
                            
                            <CustomInput
                                icon='lock-closed-outline'
                                nameIcon={ showPassword ? 'eye' : 'eye-off' }
                                onChangeText={ (value: string) => onChange(value, 'password') }
                                onPress={ () => setShowPassword(!showPassword) }
                                placeholder='Contraseña'
                                secureTextEntry={ !showPassword }
                                value={ password }
                            />

                            <TouchableOpacity
                                activeOpacity={ colors.opacity }
                                onPress={() => setModalVisible(true)}
                            >
                                <Text style={[ public_screens.subtitle_info, { color: colors.gray_opacity, }]}>
                                    ¿Olvidaste tu contraseña?
                                </Text>
                            </TouchableOpacity>
                            
                            <CustomButton
                                title='Iniciar Sesión'
                                onPress={ onLogin }
                            />
                        </KeyboardAvoidingView>
                    </View>
                </ScrollView>
            </View>
        </>
    )
}

export default LoginScreen;

const styles = StyleSheet.create({
    centered_view: {
        alignItems: 'center',
        flex: 1,
        justifyContent: 'center',
        marginTop: 22,
    },
    modal_view: {
        backgroundColor: colors.white,
        borderRadius: 20,
        elevation: 5,
        paddingHorizontal: 20,
        shadowColor: colors.black_opacity,
        shadowOffset: { height: 2, width: 0, },
        shadowOpacity: 0.25,
        shadowRadius: 4,
    },
    container_modal: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginBottom: 13,
        width: '100%',
    },
});