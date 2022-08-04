import React from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, View } from 'react-native';

import { Navigation } from '../../helpers/interfaces/appInterfaces';

import { CustomHeader } from '../../components/Layout/CustomHeader';

import { colors, general } from '../../theme/customTheme';

const ScoreScreen = ({ navigation }: Navigation) => {
    return (
        <KeyboardAvoidingView
            behavior={ (Platform.OS === 'ios') ? 'padding' : 'height' }
            style={ general.fullScreen }
        >
            <CustomHeader
                isHome={ true }
                navigation={ navigation }
                title='TOP'
            />

            <ScrollView
                showsVerticalScrollIndicator={ false }
                style={[ general.marginVertical, general.global_margin ]}
            >
                <View style={ styles.container }>
                    <Text style={ styles.title }>MEJORES USUARIOS</Text>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    )
}

export default ScoreScreen;

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.primary,
        borderRadius: 18,
        padding: 20,
    },
    title: {
        color: colors.white,
        textAlign: 'center',
    },
})
