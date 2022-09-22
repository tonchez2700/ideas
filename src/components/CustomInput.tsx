import React from 'react';
import { StyleSheet, TextInput, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import { colors } from '../theme/customTheme';

interface Props {
    autoCapitalize?:    any;
    keyboardType?:      any;
    icon?:              string;
    nameIcon?:          string;
    onChangeText?:      any;
    onPress?:           any;
    label?:             string;
    placeholder?:       string;
    secureTextEntry?:   any;
    type?:              string;
    value?:             string;
    editable?:          boolean
    maxLength?:         numeric
}

const CustomInput = ({ maxLength=30, editable=true, autoCapitalize='none', keyboardType='default', icon, nameIcon, onChangeText, onPress, label, placeholder, secureTextEntry, type='PRIMARY', value }: Props) => {

    return (
        <View style={[
            inputs.container, inputs[`container_${type}`]
        ]}>
            <View style={[
                inputs.view, inputs[`view_${type}`]
            ]}>
                { icon &&
                    <View style={ inputs.first_icon }>
                        <Icon
                            color={ colors.gray_opacity }
                            name={ icon }
                            onPress={ onPress && onPress }
                            size={ 20 }
                        />
                    </View>
                }
                <TextInput
                    maxLength={maxLength}
                    editable={editable}
                    autoCapitalize={ autoCapitalize }
                    autoCompleteType='off'
                    keyboardType={ keyboardType }
                    onChangeText={ onChangeText }
                    placeholder={ placeholder }
                    placeholderTextColor={ colors.gray_opacity }
                    secureTextEntry={ secureTextEntry }
                    style={[
                        inputs.input, inputs[`text_${type}`]
                    ]}
                    value={ value }
                />
                { nameIcon &&
                    <View style={ inputs.last_icon }>
                        <Icon
                            color={ colors.primary }
                            name={ nameIcon }
                            onPress={ onPress && onPress }
                            size={ 20 }
                        />
                    </View>
                }
            </View>
        </View>
    );
}

export default CustomInput;

const inputs = StyleSheet.create({
    container: {
        height: 57,
        marginBottom: 20,
        shadowColor: colors.black_opacity,
        shadowOffset: { height: 1, width: 0, },
        width: '100%',
    },
    container_PRIMARY: {
        backgroundColor: colors.white,
        borderColor: colors.transparent,
        borderRadius: 6,
        borderWidth: 1,
        paddingHorizontal: 10,
    },
    container_SECONDARY: {
        backgroundColor: colors.white,
        borderColor: colors.gray_light,
        borderRadius: 6,
        borderWidth: 1,
        paddingHorizontal: 10,
    },
    container_TERTIARY: {
        backgroundColor: colors.transparent,
        borderColor: colors.gray_light,
        borderRadius: 6,
        borderBottomWidth: 1,
        paddingHorizontal: 10,
        shadowColor: colors.transparent,
        shadowOffset: { height: 0, width: 0, },
    },
    text_PRIMARY: {
        fontSize: 20,
    },
    text_SECONDARY: {
        fontSize: 20,
    },
    text_TERTIARY: {
        fontSize: 20,
    },
    view: {
        alignItems: 'center',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-start',
    },
    view_TERTIARY: {
        flexDirection: 'row',
        justifyContent: 'center',
    },
    first_icon: {
        marginRight: 25,
    },
    last_icon: {
        marginLeft: 25,
    },
    input: {
        color: colors.black,
        flex: 1,
    },
})