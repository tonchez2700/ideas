import React from 'react';
import { ActivityIndicator, View } from 'react-native';
import { colors } from '../../theme/customTheme';

export const LoadingScreen = () => {
    return (
        <View style={{ alignItems: 'center', flex: 1, justifyContent: 'center' }}>
            <ActivityIndicator color={ colors.black } size={ 50 } />
        </View>
    )
}