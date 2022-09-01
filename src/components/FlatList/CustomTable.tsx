import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

import listClients from '../../helpers/data/listClients.json'

import { colors, general } from '../../theme/customTheme';

export const CustomTable = ({ data } : any) => {

    let total = 0;

    return (
        <View>
            { data !== null && data !== undefined
                &&
                <View>
                    {data.map((el: any, i: number) => {
                        total+= el.points
                        return (<View key={ i } style={[ styles.item_card, general.global_margin ]}>
                            <View style={{ alignItems: 'center', flex: 1, flexDirection: 'row', height: '100%' }}>
                                <View style={ styles.icon_container }>
                                    <Icon color={ colors.primary } name="file-contract" size={ 30 } />
                                </View>
                                <View style={{ alignContent: 'center', flex: 1, paddingHorizontal: 24 }}>
                                    <Text style={ styles.info_title }>
                                        { el.name }
                                    </Text>
                                </View>
                                <View style={ styles.info_container }>
                                    <Text style={ styles.info_middle }>{ el.amount }</Text>
                                    <Text style={[ styles.info_title, styles.text_right ]}>{ el.points } pts</Text>
                                </View>
                            </View>
                        </View>)
                    })}
                </View>
            }
            <View style={[ general.global_margin, styles.info_container, { alignSelf: 'flex-end', paddingVertical: 15, }]}>
                <Text style={[ styles.info_title, { width: 125 }]}>Puntaje Total</Text>
                <Text style={[ styles.info_title, styles.text_right ]}>{total} pts</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    HeadStyle: {
        alignContent: 'center',
        backgroundColor: '#ffe0f0',
        height: 50,
    },
    TableText: { 
        margin: 10
    },
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
        width: 40,
    },
    info_middle: {
        color: colors.black,
        fontSize: 15,
        fontWeight: 'bold',
        minWidth: 80,
        textAlign: 'center',
    },
    info_title: {
        color: colors.black,
        fontSize: 15,
        fontWeight: 'bold',
        minWidth: 60,
    },
    text_right: {
        textAlign: 'right',
    },
    info_text: {
        color: colors.black_opacity,
        fontSize: 12,
    },
    info_container: {
        flexDirection: 'row',
    },
})