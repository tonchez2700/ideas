import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import CustomDrawer from '../components/Layout/CustomDrawer';

import DashboardScreen from '../screens/private/DashboardScreen';
import ProspectsScreen from '../screens/private/catalogs/ProspectsScreen';
import ScheduleScreen from '../screens/private/ScheduleScreen';
import ScheduleCreationScreen from '../screens/private/catalogs/details/ScheduleCreationScreen';
import BinacleScreen from '../screens/private/catalogs/BinacleScreen';
import RequestScreen from '../screens/private/RequestScreen';
import ScoreScreen from '../screens/private/ScoreScreen';
import LibraryScreen from '../screens/private/catalogs/LibraryScreen';

import ProspectScreen from '../screens/private/catalogs/details/ProspectScreen';
import BinacleDetailScreen from '../screens/private/catalogs/details/BinacleDetailScreen';
import LibraryDetailScreen from '../screens/private/catalogs/details/LibraryDetailScreen';

import { colors } from '../theme/customTheme';

const navOptionHandler = () => ({
  headerShown: false
})

const StackLibrary = createNativeStackNavigator();

const LibraryStack = () => {
  return (
    <StackLibrary.Navigator initialRouteName='LibraryScreen'>
      <StackLibrary.Screen
        component={ LibraryScreen }
        name='Library'
        options={ navOptionHandler }
      />
      <StackLibrary.Screen
        component={ LibraryDetailScreen }
        name='LibraryDetail'
        options={ navOptionHandler }
      />
    </StackLibrary.Navigator>
  )
}

export type ProductsStackParams = {
  ProspectsScreen: undefined,
  ProspectScreen: { id?: number, name?: string }
}

const StackDirectory = createNativeStackNavigator<ProductsStackParams>();

const DirectoryStack = () => {
  return (
    <StackDirectory.Navigator>
      <StackDirectory.Screen
        component={ ProspectsScreen }
        name='ProspectsScreen'
        options={ navOptionHandler }
      />
      <StackDirectory.Screen
        component={ ProspectScreen }
        name='ProspectScreen'
        options={ navOptionHandler }
      />
    </StackDirectory.Navigator>
  )
}

const StackBinacle = createNativeStackNavigator();

const BinacleStack = () => {
  return (
    <StackBinacle.Navigator initialRouteName='BinacleScreen'>
      <StackBinacle.Screen
        component={ BinacleScreen }
        name='Binacle'
        options={ navOptionHandler }
      />
      <StackBinacle.Screen
        component={ BinacleDetailScreen }
        name='BinacleDetail'
        options={ navOptionHandler }
      />
    </StackBinacle.Navigator>
  )
}

const ScheduleStack = () => {
  return (
    <StackBinacle.Navigator initialRouteName='ScheduleScreen'>
      <StackBinacle.Screen
        component={ ScheduleScreen }
        name='ScheduleList'
        options={ navOptionHandler }
      />
      <StackBinacle.Screen
        component={ ScheduleCreationScreen }
        name='ScheduleCreation'
        options={ navOptionHandler }
      />
    </StackBinacle.Navigator>
  )
}

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator
      drawerContent={ (props) => <CustomDrawer { ...props } /> }
      screenOptions={{
        drawerActiveBackgroundColor: colors.primary,
        drawerInactiveBackgroundColor: colors.white,
        drawerActiveTintColor: colors.white,
        drawerInactiveTintColor: colors.black,
        headerShown: false
      }}
      useLegacyImplementation
    >
      <Drawer.Screen name='Dashboard' component={ DashboardScreen } />
      <Drawer.Screen name='Directorio' component={ DirectoryStack } />
      <Drawer.Screen name='Agenda' component={ ScheduleStack } />
      <Drawer.Screen name='Bitácora' component={ BinacleStack } />
      <Drawer.Screen name='Póliza' component={ RequestScreen } />
      <Drawer.Screen name='Top 10' component={ ScoreScreen } />
      <Drawer.Screen name='Biblioteca' component={ LibraryStack } />
    </Drawer.Navigator>
  );
}

export default DrawerNavigator;