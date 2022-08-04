import React from 'react';
import { Linking, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Icons from 'react-native-vector-icons/Ionicons';

import { colors } from '../../theme/customTheme';

export const CustomRecord = (item: any) => {
    const callPhoneNumber = () => {
        let phoneNumber = '';
        if(Platform.OS === 'android') {
            phoneNumber = `tel: ${ item.phone }`;
        } else {
            phoneNumber = `telprompt: ${ item.phone }`;
        }
  
        Linking.openURL(phoneNumber);
    }

    return (
        <View style={ styles.item_card }>
            <View style={{ alignItems: 'center', flex: 1, flexDirection: 'row', height: '100%' }}>
                <View style={ styles.icon_container }>
                    <Icons color={ colors.white } name='information-outline' size={ 18 } />
                </View>
                <View style={{ alignContent: 'center', flex: 1, paddingHorizontal: 6 }}>
                    <Text style={ styles.info_title }>
                        { item?.title }
                    </Text>
                    <Text style={ styles.info_text }>
                        { item?.message }
                    </Text>
                </View>
            </View>
            <View style={ styles.info_container }>
                <TouchableOpacity
                    activeOpacity={ colors.opacity }
                    onPress={ () => Linking.openURL(`whatsapp://send?text=${ item.message }&phone=${ item.phone }`) }
                    style={[ styles.social_icon, { backgroundColor: '#43AB11', marginRight: 10 }]}
                >
                    <Icon color={ colors.white } name='whatsapp' size={ 15 } />
                </TouchableOpacity>
                <TouchableOpacity
                    activeOpacity={ colors.opacity }
                    onPress={ callPhoneNumber }
                    style={[ styles.social_icon, { backgroundColor: colors.primary, }]}
                >
                    <Icon color={ colors.white } name='phone' size={ 15 } />
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    item_card: {
        alignItems: 'center',
        backgroundColor: '#B2E1FF',
        borderRadius: 24,
        flexDirection: 'row',
        height: 48,
        justifyContent: 'space-between',
        marginBottom: 13,
    },
    icon_container: {
        alignItems: 'center',
        backgroundColor: colors.primary,
        borderBottomStartRadius: 24,
        borderTopEndRadius: 24,
        borderTopStartRadius: 24,
        justifyContent: 'center',
        height: '100%',
        width: 48,
    },
    info_title: {
        color: colors.black,
        fontSize: 12,
        fontWeight: 'bold',
    },
    info_text: {
        color: colors.black,
        fontSize: 10,
    },
    info_container: {
        flexDirection: 'row',
        marginRight: 14,
    },
    social_icon: {
        alignItems: 'center',
        borderRadius: 4,
        height: 22,
        justifyContent: 'center',
        width: 22,
    }
})