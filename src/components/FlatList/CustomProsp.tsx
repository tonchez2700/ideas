import React, { useEffect, useState } from 'react';
import {
    ScrollView, ActivityIndicator, FlatList,
    LogBox, Platform, StyleSheet, Text, View,
} from 'react-native';
import { AccordionItem } from 'react-native-accordion-list-view';
import { colors, general } from '../../theme/customTheme';
import Icon from 'react-native-vector-icons/FontAwesome5';
import moment from 'moment'
import { color } from 'react-native-reanimated';

export const CustomProsp = ({ data }: any) => {

    const colorsState = () => {
        let color
        switch (true) {
            case data.prospects.prospects_percentage <= 20:
                color = '#FF3729'
                break;
            case data.prospects.prospects_percentage <= 40:
                color = '#DAF7A6'
                break;
            case data.prospects.prospects_percentage <= 60:
                color = '#FF7F27'
                break;
            case data.prospects.prospects_percentage <= 80:
                color = '#F3DC06'
                break;
            case data.prospects.prospects_percentage == 100:
                color = 'green'
                break;
        }
        return color
    }

    return (
        <View>

            <AccordionItem
                isRTL={true}
                animationDuration={400}
                containerStyle={styles.borderCard}
                customTitle={() =>
                    <View style={{ flexDirection: 'row', height: '100%' }}>
                        <View style={{ alignItems: 'center', flexDirection: 'row', height: '100%' }}>
                            <View style={styles.icon_container}>
                                <Icon color={colors.primary} name="calendar-alt" size={30} />
                            </View>
                            <View style={{ paddingVertical: 10 }}>
                                <Text style={styles.info_title}>Prospectos</Text>
                            </View>
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'flex-end', width: '60%' }}>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <Text style={[styles.info_title, { marginRight: 3 }]}>{data.prospects.prospects_completed}</Text>
                                <Icon style={{ paddingVertical: 10, marginRight: 10 }} color={colors.primary} name="check" solid={true} size={20} />
                            </View>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <Text style={[styles.info_title, { marginRight: 3 }]}>{data.prospects.prospects_prospects_goal}</Text>

                                <Icon style={{ paddingVertical: 10, marginRight: 10 }} color={colors.primary} name="flag" solid={true} size={20} />
                            </View>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <Text style={[styles.info_title, { marginRight: 3 }]}>{Math.floor(data.prospects.prospects_percentage)}%</Text>
                                <Icon style={{ paddingVertical: 10, marginRight: 10 }} color={colorsState()} name="circle" solid={true} size={20} />
                            </View>
                        </View>
                    </View>
                }
                customBody={() =>

                    <View>
                        <View style={styles.tableCard}>
                            <Text style={styles.textCard}>Fecha</Text>
                            <Text style={styles.textCard}>Prospecto</Text>
                            <Text style={styles.textCard}>Tipo</Text>
                        </View>
                        {
                            data.prospects
                                ?
                                data.prospects.prospects.map((el: any, i: number) => {
                                    const Day = new Date(el.created_at);
                                    const Creat_date = moment(Day).format('DD/MM/YYYY')
                                    return (
                                        <View key={el.id} style={{ paddingHorizontal: 10 }}>
                                            <View style={styles.tableItems}>
                                                <Text style={styles.text}>{Creat_date}</Text>
                                                <Text style={styles.text}>{el.name} {el.first_name}</Text>
                                                <Text style={styles.text}>{el.policy_type}</Text>
                                            </View>
                                        </View>
                                    )
                                })

                                : <View style={{ marginVertical: 15 }}>
                                    <Text
                                        style={{ color: '#005691', fontSize: 20, textAlign: 'center' }}>
                                        Aun no ha asignado su meta personal.
                                    </Text>
                                </View>
                        }
                    </View>
                }

            />

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
    borderCard: {
        marginTop: 10,
        padding: 5,
        borderRadius: 4,
        borderColor: 'gray',
        elevation: 3
    },
    textCard: {
        fontWeight: 'bold',
        paddingVertical: 16,
        fontSize: 14,
        color: 'white',
        width: '33.33%'
    },
    tableCard: {
        paddingVertical: 2,
        flexDirection: 'row',
        paddingHorizontal: 10,
        backgroundColor: '#005691',
        justifyContent: 'space-between',

    },
    tableItems: {
        paddingVertical: 2,
        flexDirection: 'row',
        borderTopColor: '#E6E6E6',
        borderTopWidth: 2,
        paddingHorizontal: 10,
        justifyContent: 'space-between',

    },
    text: {
        fontSize: 14,
        width: '33.33%',
        marginVertical: 19,
        fontWeight: 'bold',
    }
})