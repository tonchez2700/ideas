import React, { useContext, useState, useEffect } from 'react';
import { KeyboardAvoidingView, Platform, View, ActivityIndicator, RefreshControl } from 'react-native';

import { CustomHeader } from '../../../components/Layout/CustomHeader';
import { CustomPolici } from '../../../components/FlatList/CustomPolici';
import { CustomAppoint } from '../../../components/FlatList/CustomAppoint';
import { CustomCalls } from '../../../components/FlatList/CustomCalls';
import { CustomProsp } from '../../../components/FlatList/CustomProsp';
import { BinnacleContext } from '../../../context/BinnacleContext';
import { general } from '../../../theme/customTheme';
import { Navigation } from '../../../helpers/interfaces/appInterfaces';
import { ScrollView } from 'react-native-gesture-handler';


const wait = (timeout: any) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
}
const BinacleScreen = ({ navigation }: Navigation) => {
    const { binnacleList, fetchBinnacle } = useContext(BinnacleContext);
    const [refreshing, setRefreshing] = React.useState(false);

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        wait(2000).then(() => setRefreshing(false));
    }, []);


    useEffect(() => {
        fetchBinnacle()
    }, [])

    return (
        <KeyboardAvoidingView
            behavior={(Platform.OS === 'ios') ? 'padding' : 'height'}
            style={general.fullScreen}
        >
            <ScrollView
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={() => {
                            fetchBinnacle()
                            onRefresh()
                        }
                        }
                    />
                }
            >
                <CustomHeader
                    isHome={true}
                    navigation={navigation}
                    title='BITÁCORA'
                />
                <View style={general.fullScreen}>
                    {
                        binnacleList.length !== 0
                            ?
                            <View style={{ flex: 1, margin: 10 }}>
                                <CustomAppoint data={binnacleList} />
                                <CustomCalls data={binnacleList} />
                                <CustomPolici data={binnacleList} />
                                <CustomProsp data={binnacleList} />
                            </View>
                            :
                            <ActivityIndicator size="small" color="#0000ff" />
                    }

                </View>
            </ScrollView>
        </KeyboardAvoidingView >
    )
}

export default BinacleScreen;
