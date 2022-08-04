import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import { colors } from '../theme/customTheme';

interface Props {
    nameIcon?:  any;
    onPress?:   any;
    title?:     string;
    type?:      string;
}

const CustomButton = ({ nameIcon, onPress, title, type='PRIMARY' }: Props) => {

    return (
        <TouchableOpacity
            activeOpacity={ colors.opacity }
            onPress={ onPress }
            style={[ buttons.button_container, buttons[`btn_${type}`] ]}
        >
            { title
                ?   <Text style={[ buttons.text, buttons[`text_${type}`] ]}>
                        { title }
                    </Text>
                :   <View>
                        <Icon
                            color={ colors.secondary }
                            name={ nameIcon }
                            onPress={ onPress && onPress }
                            size={ 25 }
                        />
                    </View>
            }
        </TouchableOpacity>
    )
}

export default CustomButton;

const buttons = StyleSheet.create({
    button_container: {
        backgroundColor: colors.white,
        borderRadius: 28,
        height: 56,
        justifyContent: 'center',
        marginVertical: 17,
        paddingHorizontal: 20,
        width: '100%',
    },
    btn_PRIMARY: {
        backgroundColor: colors.primary,
    },
    btn_SECONDARY: {
        backgroundColor: colors.white,
        borderColor: colors.primary,
        borderWidth: 2,
    },
    btn_filter: {
        alignItems: 'center',
        backgroundColor: colors.white,
        elevation: 3,
        height: 50,
        paddingHorizontal: 0,
        shadowColor: colors.black_opacity,
        shadowOffset: { height: 2, width: 0, },
        width: 50,
    },
    btn_social: {
        backgroundColor: colors.white,
        elevation: 3,
        shadowColor: colors.black_opacity,
        shadowOffset: { height: 2, width: 0, },
        width: 80,
    },
    text: {
        alignSelf: 'center',
        fontSize: 17,
        fontWeight: 'bold',
    },
    text_PRIMARY: {
        color: colors.white,
    },
    text_SECONDARY: {
        color: colors.primary,
    },
    text_social: {
        color: colors.black,
    },
    icon_filter: {
        color: colors.white,
    }
})
