import React, { useContext } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import { AuthContext } from '../../context/AuthContext';

import { colors } from '../../theme/customTheme';

interface Props {
    title?:         string;
    isHome?:        any;
    navigation?:    any;
}

export const CustomHeader = ({ title, isHome, navigation }: Props) => {    
    const openDrawer = () => {
        navigation.openDrawer();
    }

    return (
        <View style={[ header.container_view, header.container_PRIMARY ]}>
            {
                isHome ?
                    <>
                        <View></View>
                        <Text style={ header.title }>{ title }</Text>
                    </>
                :
                    <View style={ header.container }>
                        <TouchableOpacity
                            activeOpacity={ colors.opacity }
                            onPress={ () => navigation.goBack() }
                            style={{ flexDirection: 'row', alignItems: 'center' }}
                        >
                            <Icon
                                name='chevron-back-outline'
                                color={ colors.white }
                                size={ 25 }
                            />
                            <Text style={ header.textBack }>Regresar</Text>
                        </TouchableOpacity>
                    </View>
            }
            {
                isHome &&
                    <TouchableOpacity
                        activeOpacity={ colors.opacity }
                        onPress={ openDrawer }
                    >
                        <Icon
                            name='menu'
                            color={ colors.white }
                            size={ 25 }
                        />
                    </TouchableOpacity>
            }
        </View>
    )
}

export const CustomHomeHeader = ({ navigation }: Props) => {
    const { user } = useContext(AuthContext);
    
    const openDrawer = () => {
        navigation.openDrawer();
    }
    
    return (
        <View style={[ header.container_view, header.container_SECONDARY ]}>
            <View style={{ flexDirection: 'row', paddingTop: 30, }}>
                <View style={{ height: 50, width: 50, }}>
                    <Image
                        source={ require('../../assets/images/user.png') }
                        style={ header.image }
                    />
                </View>
                <View style={{ justifyContent: 'center', marginLeft: 25, }}>
                    <Text style={ header.text }>Hola, <Text style={{ fontWeight: 'normal' }}>{ user?.name }</Text></Text>
                    <Text style={ header.subText }>Sigue cumpliendo tus metas</Text>
                </View>
            </View>
            
            <TouchableOpacity
                activeOpacity={ colors.opacity }
                onPress={ openDrawer }
                style={{ top: 25, right: 20, position: 'absolute', }}
            >
                <Icon
                    name='menu'
                    color={ colors.white }
                    size={ 25 }
                />
            </TouchableOpacity>
        </View>
    )
}

const header = StyleSheet.create({
    container_view: {
        alignItems: 'center',
        backgroundColor: colors.primary,
        width: '100%',
    },
    container_PRIMARY: {
        flexDirection: 'row',
        height: 70,
        justifyContent: 'space-between',
        paddingHorizontal: 20,
    },
    container_SECONDARY: {
        flexDirection: 'row',
        height: 120,
        justifyContent: 'space-between',
        paddingHorizontal: 20,
    },
    container: {
        alignItems: 'center',
        flexDirection: 'row',
        height: 50,
        justifyContent: 'space-between',
    },
    image: {
        backgroundColor: colors.white,
        borderColor: colors.white,
        borderRadius: 100,
        borderWidth: 2,
        height: '100%',
        width: '100%',
    },

    slogan: {
        height: 35,
    },
    title: {
        color: colors.white,
        fontSize: 25,
        fontWeight: 'bold',
        textAlign: 'left',
    },
    text: {
        color: colors.white,
        fontSize: 14,
        fontWeight: 'bold',
    },
    subText: {
        color: colors.white,
        fontSize: 11,
    },
    textBack: {
        color: colors.white,
        fontSize: 15,
        marginLeft: 5,
    }
})