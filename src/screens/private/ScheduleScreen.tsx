import React, { useState, useContext } from 'react';
import { KeyboardAvoidingView, Platform, Text, TouchableOpacity, View, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Card } from 'react-native-paper';
import { Agenda } from 'react-native-calendars';

import { CustomHeader } from '../../components/Layout/CustomHeader';
import useFetch from '../../hooks/useFetch';

import { ScheduleContext } from '../../context/ScheduleContext';
import { Navigation } from '../../helpers/interfaces/appInterfaces';
import { colors, general } from '../../theme/customTheme';

const timeToString = (time: any) => {
    const date = new Date(time);
    return date.toISOString().split('T')[0];
};

const ScheduleScreen = ({ navigation }: Navigation) => {
    const { fetching, handleUpdateScheduleStatus } = useContext(ScheduleContext);
    const [items, setItems] = useState<any>([]);
    const { response } = useFetch('/appointments', 'GET', { agent_id: 1 })

    const loadItems = (day: any) => {
        setTimeout(() => {
            for(let i = -15; i < 85; i++) {
                const time = day.timestamp + i * 24 * 60 * 60 * 1000;
                const strTime: any = timeToString(time);
                if(!items[strTime]) {
                    items[strTime] = [];
                    const numItems = Math.floor(Math.random() * 3 + 1);
                    for(let j = 0; j < numItems; j++) {
                        items[strTime].push({
                            id: 4,
                            name: 'Lorem ' + strTime + ' #' + j,
                            height: Math.max(50, Math.floor(Math.random() * 150)),
                        });
                    }
                }
            }
            const newItems: any = {};
            Object.keys(items).forEach((key) => {
                newItems[key] = items[key];
            });
            setItems(newItems);
        }, 1000);
    };

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
                                        <Text style={{ color: colors.primary, fontWeight: 'bold', fontSize: 7, marginLeft: 8, }}>Hola</Text>
                                    </View>
                                </View>
                                <TouchableOpacity
                                    onPress={() => handleUpdateScheduleStatus(item.id)}
                                    activeOpacity={ colors.opacity}
                                    style={{ marginVertical: 10, }}
                                >
                                    <Icon
                                        size={ 20 }
                                        name='event-available'
                                        color={ colors.primary }
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
                :   <Agenda
                        hideKnob
                        items={ items }
                        loadItemsForMonth={ loadItems }
                        renderItem={ renderItem }
                    />
            }
            
        </KeyboardAvoidingView>
    )
}

export default ScheduleScreen;
