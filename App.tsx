import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';

import StackNavigator from './src/navigation/StackNavigator';
import { AuthProvider } from './src/context/AuthContext';
import { ProspectsProvider } from './src/context/ProspectsContext';
import { ScheduleProvider } from './src/context/ScheduleContext';
import { BinnacleProvider } from './src/context/BinnacleContext';
import { GoalProvider } from './src/context/GoalContext';

const AppState = ({ children }: any) => {
    return (
        <AuthProvider>
            <GoalProvider>
                <ProspectsProvider>
                    <ScheduleProvider>
                        <BinnacleProvider>
                            { children }
                        </BinnacleProvider>
                    </ScheduleProvider>
                </ProspectsProvider>
            </GoalProvider>
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