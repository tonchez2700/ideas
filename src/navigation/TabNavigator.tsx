import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import LoginScreen from '../screens/public/LoginScreen';
import RegisterScreen from '../screens/public/RegisterScreen';

import { colors } from '../theme/customTheme';

const Tab = createMaterialTopTabNavigator();

const TabNavigator = () => {
    const { top: paddingTop } = useSafeAreaInsets()

    return (
        <Tab.Navigator
            screenOptions={{
                tabBarActiveTintColor: colors.primary,
                tabBarLabelStyle: { fontSize: 16, textTransform: 'none', }
            }}
            style={{ paddingTop }}
        >
            <Tab.Screen component={ LoginScreen } name='Iniciar Sesión' />
            <Tab.Screen component={ RegisterScreen } name='Regístrate' />
        </Tab.Navigator>
    )
}

export default TabNavigator;