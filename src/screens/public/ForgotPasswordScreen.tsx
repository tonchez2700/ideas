import React, { useState } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, Text, View } from 'react-native';

import { Navigation } from '../../helpers/interfaces/appInterfaces';

import { CustomHeader } from '../../components/Layout/CustomHeader';
import CustomButton from '../../components/CustomButton';
import CustomInput from '../../components/CustomInput';

import { general, public_screens } from '../../theme/customTheme';

const ForgotPasswordScreen = ({ navigation }: Navigation) => {
    const onPressGoBack = () => {
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
                title='Gráficas'
            />
            <View
                style={ general.global_margin }
            >
                <Text style={ public_screens.title_view }>
                    Recuperar mi contraseña
                </Text>

                <ScrollView showsVerticalScrollIndicator={ false }>
                    <CustomInput
                        keyboardType='email-address'
                        label='Correo electrónico'
                        placeholder='Correo electrónico'
                    />

                    <CustomButton
                        title='Enviar'
                    />
                </ScrollView>
            </View>
        </KeyboardAvoidingView>
    )
}

export default ForgotPasswordScreen;