import React, { useEffect, useCallback, useContext, useState } from 'react';
import { Linking, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { todayString } from 'react-native-calendars/src/expandableCalendar/commons';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Icons from 'react-native-vector-icons/Ionicons';
import { ProspectsContext } from '../../context/ProspectsContext';
import { colors, general } from '../../theme/customTheme';

export const CustomContact = (item: any) => {
    const callPhoneNumber = () => {
        addPointCall(day, item.id, 1)
        let phoneNumber = '';
        if (Platform.OS === 'android') {
            phoneNumber = `tel: ${item.phone}`;
        } else {
            phoneNumber = `telprompt: ${item.phone}`;
        }

        Linking.openURL(phoneNumber);
    }
    const { prospects, loadProspects, addPointCall } = useContext(ProspectsContext);
    const day = new Date();

    return (
        <View style={[styles.item_card, general.global_margin]}>
            <View style={{ alignItems: 'center', flex: 1, flexDirection: 'row', height: '100%' }}>
                <View style={styles.icon_container}>
                    <Icons color={colors.gray_opacity} name='person-circle' size={50} />
                </View>
                <View style={{ alignContent: 'center', flex: 1, paddingHorizontal: 24 }}>
                    <Text style={styles.info_title}>
                        {item?.name + ' ' + item?.first_name}
                    </Text>
                    <Text style={styles.info_text}>
                        {item?.phone}
                    </Text>
                    <Text style={styles.info_text}>
                         Tipo de prospecto: {item?.type}
                    </Text>
                </View>
            </View>
            <View style={styles.info_container}>
                <TouchableOpacity
                    activeOpacity={colors.opacity}
                    onPress={() => {
                        addPointCall(day, item.id, 2)
                        Linking.openURL(`whatsapp://send?phone=52${item.phone}`)
                        
                    }}
                    style={[styles.social_icon, { backgroundColor: '#43AB11', marginRight: 10 }]}
                >
                    <Icon color={colors.white} name='whatsapp' size={15} />
                </TouchableOpacity>
                <TouchableOpacity
                    activeOpacity={colors.opacity}
                    onPress={callPhoneNumber}
                    style={[styles.social_icon, { backgroundColor: colors.primary, }]}
                >
                    <Icon color={colors.white} name='phone' size={15} />
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    item_card: {
        alignItems: 'center',
        backgroundColor: colors.white,
        flexDirection: 'row',
        height: 80,
        justifyContent: 'space-between',
        marginBottom: 1,
    },
    icon_container: {
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
    },
    info_title: {
        color: colors.black,
        fontSize: 15,
        fontWeight: 'bold',
        marginBottom: 6,
    },
    info_text: {
        color: colors.black_opacity,
        fontSize: 12,
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
    },
})