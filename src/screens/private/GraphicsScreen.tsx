import React from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, View } from 'react-native';

import { Navigation } from '../../helpers/interfaces/appInterfaces';

import { CustomHeader } from '../../components/Layout/CustomHeader';
import CustomButton from '../../components/CustomButton';

import { general } from '../../theme/customTheme';

const GraphicsScreen = ({ navigation }: Navigation) => {
    return (
        <KeyboardAvoidingView
            behavior={ (Platform.OS === 'ios') ? 'padding' : 'height' }
            style={ general.fullScreen }
        >
            <CustomHeader
                isHome={ true }
                navigation={ navigation }
                title='Gráficas'
            />

            <ScrollView
                showsVerticalScrollIndicator={ false }
                style={[ general.marginVertical, general.global_margin ]}
            >
                <CustomButton
                    title='Aceptar'
                />
            </ScrollView>
        </KeyboardAvoidingView>
    )
}

export default GraphicsScreen;
