import React, { useCallback, useState } from 'react';
import { KeyboardAvoidingView, Platform, View } from 'react-native';

import useForm from '../../../hooks/useForm';

import { CustomHeader } from '../../../components/Layout/CustomHeader';
import { CustomTable } from '../../../components/FlatList/CustomTable';
import CustomInput from '../../../components/CustomInput';

import { general } from '../../../theme/customTheme';
import { Navigation } from '../../../helpers/interfaces/appInterfaces';

const BinacleScreen = ({ navigation }: Navigation) => {
    const [binacles, setBinacles] = useState<any>();
    const navegacion = navigation;
    
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
                <CustomTable />
            </View>
        </KeyboardAvoidingView>
    )
}

export default BinacleScreen;
