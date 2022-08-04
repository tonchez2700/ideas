import React from 'react';
import DropDownPicker from 'react-native-dropdown-picker';
import { StyleSheet, TextInput, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import { colors } from '../theme/customTheme'

interface Props {
    keyboardType?:      any;
    nameIcon?:          string;
    placeholder?:       string;
    secureTextEntry?:   any;
    type:               string;
}

const CustomSelect = ({ keyboardType, nameIcon, placeholder, secureTextEntry, type='PRIMARY' }: Props) => {

    return (
        <DropDownPicker
            items={[
                { label: 'Hombre', value: 'hombre' },
                { label: 'Mujer', value: 'mujer' },
                { label: 'No binario', value: 'nobinario' }
            ]}
            itemStyle={{ justifyContent: 'flex-start' }}
        >
            <View style={[
                styles.view, styles[`view_${type}`]
            ]}>
                { nameIcon &&
                    <Icon style={ styles.icon }
                        name={ nameIcon }
                        size={ 20 }
                        color={ colors.gray_opacity }
                    />
                }
                <TextInput
                    autoCompleteType='off'
                    keyboardType={ keyboardType }
                    placeholder={ placeholder }
                    placeholderTextColor={ colors.gray_opacity }
                    secureTextEntry={ secureTextEntry }
                    style={[
                        styles.input, styles[`text_${type}`]
                    ]}
                />
            </View>
        </DropDownPicker>
    );
}

export default CustomSelect;

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.white,
        borderColor: colors.black_opacity,
        borderRadius: 5,
        borderWidth: 1,
        flexDirection: 'row',
        marginVertical: 18,
        width: '100%',
    },
    container_PRIMARY: {
        paddingHorizontal: 10,
    },
    text_PRIMARY: {
        fontSize: 20,
    },
    container_SECONDARY: {
        borderColor: '#9D9D9D',
        borderWidth: 0.5,
    },
    view: {
        alignItems: 'center',
        flexDirection: 'row',
    },
    view_SECONDARY: {
        paddingHorizontal: 10,
    },
    icon: {
        marginRight: 10,
    },
    input: {
        color: colors.black,
        width: '100%',
    },
});