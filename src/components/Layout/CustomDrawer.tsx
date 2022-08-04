import React, { useContext } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';

import { AuthContext } from '../../context/AuthContext';

import { colors, general } from '../../theme/customTheme';
import CustomStatusBar from './CustomStatusBar';

const CustomDrawer = (props: any) => {
    const { user, logout } = useContext(AuthContext);

    return (
        <View style={ general.fullScreen }>
            <CustomStatusBar />
            <DrawerContentScrollView { ...props } style={ drawer.card_header }>
                <View style={ drawer.card_content }>
                    <View>
                        <Text style={ drawer.content_text }>
                            { user?.name }
                        </Text>
                        <Text>
                            { user?.email }
                        </Text>
                    </View>
                    <Image
                        source={ require('../../assets/images/user.png') }
                        style={ drawer.card_image }
                    />
                </View>
                <DrawerItemList { ...props } />
            </DrawerContentScrollView>
            <TouchableOpacity
                activeOpacity={ colors.opacity }
                onPress={ logout }
                style={ drawer.card_footer }
            >
                <Text style={ drawer.footer_text }>Cerrar sesión</Text>
            </TouchableOpacity>
        </View>
    )
}

export default CustomDrawer;

const drawer = StyleSheet.create({
    card_header: {
        paddingVertical: 0,
        marginTop: -5,
    },
    card_content: {
        alignItems: 'center',
        backgroundColor: colors.white,
        elevation: 3,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
        padding: 20,
        shadowColor: colors.black_opacity,
        shadowOffset: { height: 1, width: 0, },
    },
    content_text: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    card_image: {
        borderRadius: 30,
        height: 50,
        width: 50,
    },
    card_footer: {
        backgroundColor: colors.white,
        left: 0,
        padding: 20,
        right: 0,
        elevation: 3,
        shadowColor: colors.black_opacity,
        shadowOffset: { height: 1, width: 0, },
    },
    footer_text: {
        bottom: 0,
        color: colors.black,
    }
})