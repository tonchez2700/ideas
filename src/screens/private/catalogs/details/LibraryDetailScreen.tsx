import React, { useEffect } from 'react';
import { Image, KeyboardAvoidingView, LogBox, Platform, ScrollView, StyleSheet, Text, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { CustomHeader } from '../../../../components/Layout/CustomHeader';
import CustomButton from '../../../../components/CustomButton';

import { colors, general } from '../../../../theme/customTheme';

interface Props extends NativeStackScreenProps<any, any>{};

const LibraryDetailScreen = ({ route, navigation }: Props) => {
    const item = route.params;

    useEffect(() => {
        LogBox.ignoreLogs(["Non-serializable values were found in the navigation state"])
    }, [])
    
    return (
        <KeyboardAvoidingView
            behavior={ (Platform.OS === 'ios') ? 'padding' : 'height' }
            style={ general.fullScreen }
        >
            <CustomHeader
                isHome={ false }
                navigation={ navigation }
            />

            <ScrollView
                showsVerticalScrollIndicator={ false }
            >
                <Image resizeMode='stretch' source={{ uri: `data:image/jpeg;base64,${item?.url_image}` }} style={{ height: 250, position: 'relative', width: '100%' }} />
                <View
                    style={[ general.global_margin, general.marginVertical ]}
                >
                    <Text style={ book.title }>
                        { item?.name }
                    </Text>
                    {/*<Text style={ book.subtitle }>
                        { data?.subtitle }
                    </Text>*/}
                    <Text style={ book.text }>
                        { item?.description }
                    </Text>
                            
                    <CustomButton
                        title='Visto'
                    />
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    )
}

export default LibraryDetailScreen;

const book = StyleSheet.create({
    title: {
        color: colors.black,
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    subtitle: {
        color: colors.black,
        fontSize: 20,
        fontStyle: 'italic',
        marginBottom: 20,
    },
    text: {
        color: colors.gray_opacity,
        fontSize: 20,
        marginBottom: 20,
    },
})