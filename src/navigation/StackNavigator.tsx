import React, { useContext } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import DrawerNavigator from './DrawerNavigator';
import { AuthContext } from '../context/AuthContext';

import LoginScreen from '../screens/public/LoginScreen';
import { LoadingScreen } from '../screens/public/LoadingScreen';

const Stack = createNativeStackNavigator();

const StackNavigator = () => {
    const { status } = useContext(AuthContext);

    if(status === 'checking') return <LoadingScreen />

    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            { (status !== 'authenticated')
            ?
                <Stack.Screen component={ LoginScreen } name='Login' />
            :
                <Stack.Screen component={ DrawerNavigator } name='PrivateHome' />
            }
        </Stack.Navigator>
    );
}

export default StackNavigator;