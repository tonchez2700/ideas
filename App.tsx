import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';

import StackNavigator from './src/navigation/StackNavigator';
import { AuthProvider } from './src/context/AuthContext';
import { ProspectsProvider } from './src/context/ProspectsContext';
import { ScheduleProvider } from './src/context/ScheduleContext';
import { BinnacleProvider } from './src/context/BinnacleContext';

const AppState = ({ children }: any) => {
    return (
        <AuthProvider>
            <ProspectsProvider>
                <ScheduleProvider>
                    <BinnacleProvider>
                        { children }
                    </BinnacleProvider>
                </ScheduleProvider>
            </ProspectsProvider>
        </AuthProvider>
    )
}

const App = () => {
    return (
        <NavigationContainer> 
            <AppState>
                <StackNavigator />
            </AppState>
        </NavigationContainer>
    )
}

export default App;