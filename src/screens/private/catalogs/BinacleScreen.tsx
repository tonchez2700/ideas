import React, { useContext, useState, useEffect } from 'react';
import { KeyboardAvoidingView, Platform, View, ActivityIndicator } from 'react-native';

import { CustomHeader } from '../../../components/Layout/CustomHeader';
import { CustomTable } from '../../../components/FlatList/CustomTable';

import { BinnacleContext } from '../../../context/BinnacleContext';
import { general } from '../../../theme/customTheme';
import { Navigation } from '../../../helpers/interfaces/appInterfaces';

const BinacleScreen = ({ navigation }: Navigation) => {
    const { binnacleList, fetchBinnacle } = useContext(BinnacleContext);

    useEffect(() => {
        fetchBinnacle()
    }, [])
    
    return (
        <KeyboardAvoidingView
            behavior={ (Platform.OS === 'ios') ? 'padding' : 'height' }
            style={ general.fullScreen }
        >
            <CustomHeader
                isHome={ true }
                navigation={ navigation }
                title='BITÁCORA'
            />
            <View style={ general.fullScreen }>
                {
                    binnacleList.length > 0
                    ? <CustomTable data={binnacleList} />
                    : <ActivityIndicator size="small" color="#0000ff" />
                }
                
            </View>
        </KeyboardAvoidingView>
    )
}

export default BinacleScreen;
