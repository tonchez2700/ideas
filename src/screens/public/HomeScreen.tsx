import React from 'react';
import { Image, ScrollView, Text, View } from 'react-native';

import { Navigation } from '../../helpers/interfaces/appInterfaces';

import CustomStatusBar from '../../components/Layout/CustomStatusBar';
import CustomButton from '../../components/CustomButton';

import { general } from '../../theme/customTheme';

const HomeScreen = ({ navigation }: Navigation) => {
    return (
        <>
            <CustomStatusBar />
            <ScrollView
                showsVerticalScrollIndicator={ false }
                style={ general.fullScreen }
            >
                <Image resizeMode='stretch' source={ require('../../assets/images/bgLogin.png') } style={{ position: 'relative', width: '100%' }} />
                    
                <View style={[ general.fullScreen, general.global_margin, { flexDirection: 'column', justifyContent: 'space-around', marginTop: 30, }]}>
                    {/*<CustomLogo />
                    <Text style={[ public_screens.title_view, { textAlign: 'center' }]}>
                        TU AVENTURA COMIENZA AQUÍ
                    </Text>*/}

                    <ScrollView showsVerticalScrollIndicator={ false }>
                        {/*<CustomButton
                            title='Regístrate'
                            onPress={ () => navigation.navigate('PublicTabs') }
                        />*/}

                        <CustomButton
                            title='Login'
                            onPress={ () => navigation.navigate('Login') }
                            type='SECONDARY'
                        />
                    </ScrollView>
                </View>
            </ScrollView>
        </>
    )
}

export default HomeScreen;