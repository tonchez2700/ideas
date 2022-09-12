import React, { useEffect, useState, useContext } from 'react';
import { StyleSheet, KeyboardAvoidingView, Platform, Text, TouchableOpacity, View, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Card } from 'react-native-paper';
import { Agenda } from 'react-native-calendars';

import { CustomHeader } from '../../components/Layout/CustomHeader';
import useFetch from '../../hooks/useFetch';

import { ScheduleContext } from '../../context/ScheduleContext';
import { Navigation } from '../../helpers/interfaces/appInterfaces';
import { colors, general } from '../../theme/customTheme';
import { useIsFocused } from '@react-navigation/native';

const timeToString = (time: any) => {
    const date = new Date(time);
    return date.toISOString().split('T')[0];
};

const ScheduleScreen = ({ navigation }: Navigation) => {
    const isFocused = useIsFocused();
    const { 
        agenda,
        fetching,
        fetchAppointments, 
        handleUpdateScheduleStatus 
    } = useContext(ScheduleContext);

    useEffect(() => {
        fetchAppointments()
    }, [isFocused])

    const renderItem = (item: any) => {
        return (
            <View style={{ marginHorizontal: 30 }}>
                <View style={{ marginVertical: 10 }}>
                    <Card style={{ backgroundColor: '#B2E1FF' }}>
                        <Card.Content>
                            <View style={{ alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between' }}>
                                <View>
                                    <Text style={{ color: colors.primary, fontWeight: 'bold', fontSize: 11, }}>{ item.name }</Text>
                                    <Text style={{ color: colors.gray_opacity, fontSize: 10, marginVertical: 7, }}>{ item.name }</Text>
                                    <View style={{ alignItems: 'center', flexDirection: 'row' }}>
                                        <Icon
                                            size={ 12 }
                                            name='schedule'
                                            color={ colors.primary }
                                        />
                                        <Text style={{ color: colors.primary, fontWeight: 'bold', fontSize: 7, marginLeft: 8, }}>{item.appointment_hour}</Text>
                                    </View>
                                </View>
                                <TouchableOpacity
                                    disabled={ item.is_done === 1 ? true : false }
                                    onPress={() => handleUpdateScheduleStatus(item.id)}
                                    activeOpacity={ colors.opacity}
                                    style={{ marginVertical: 10, }}
                                    
                                >
                                    <Icon
                                        size={ 20 }
                                        name='event-available'
                                        color={ item.is_done ? colors.primary : colors.gray_opacity }
                                    />
                                </TouchableOpacity>
                            </View>
                        </Card.Content>
                    </Card>
                </View>
            </View>
        )
    }

    return (
        <KeyboardAvoidingView
            behavior={ (Platform.OS === 'ios') ? 'padding' : 'height' }
            style={ general.fullScreen }
        >
            <CustomHeader
                isHome={ true }
                navigation={ navigation }
                title='AGENDA'
            />
            {
                fetching
                ?   <ActivityIndicator size="small" color="#0000ff" />
                :   <View style={{ flex: 1 }}>
                        <Agenda
                            hideKnob
                            items={ agenda.schedules }
                            renderItem={ renderItem }
                        />
                        <TouchableOpacity
                            activeOpacity={ colors.opacity }
                            onPress={ () => navigation.navigate("ScheduleCreation") }
                            style={ styles.add_button }
                        >
                            <Icon
                                color={ colors.primary }
                                name='add'
                                size={ 18 }
                            />
                        </TouchableOpacity>
                    </View>
            }
            
        </KeyboardAvoidingView>
    )
}

export default ScheduleScreen;


const styles = StyleSheet.create({
    add_button: {
        alignItems: 'center',
        backgroundColor: colors.white,
        borderRadius: 100,
        bottom: 34,
        elevation: 3,
        justifyContent: 'center',
        height: 62,
        position: 'absolute',
        right: 18,
        shadowColor: colors.black_opacity,
        shadowOffset: { height: 2, width: 0, },
        width: 62,
    },
})
