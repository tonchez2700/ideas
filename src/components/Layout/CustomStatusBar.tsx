import React from 'react';
import { StatusBar } from 'react-native';
import { colors } from '../../theme/customTheme';

const CustomStatusBar = () => {
    return (
        <StatusBar backgroundColor={ colors.primary } barStyle="light-content" />
    );
}

export default CustomStatusBar;