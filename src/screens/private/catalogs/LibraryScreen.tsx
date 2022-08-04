import React, { useEffect } from 'react';
import { FlatList, Image, KeyboardAvoidingView, LogBox, Platform, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import useFetch from '../../../hooks/useFetch';

import { CustomHeader } from '../../../components/Layout/CustomHeader';
import { CustomCard } from '../../../components/FlatList/CustomCard';

import { colors, general } from '../../../theme/customTheme';
import { Navigation } from '../../../helpers/interfaces/appInterfaces';

const LibraryScreen = ({ navigation }: Navigation) => {
    const { response } = useFetch('/articles', 'GET');

    useEffect(() => {
        LogBox.ignoreLogs(["VirtualizedLists should never be nested"])
    }, [response])
    
    const renderOption = ({ item }: any) => (
        <CustomCard
            content={ item.content }
            created_at={ item.created_at }
            created_by={ item.created_by }
            description={ item.description }
            is_active={ item.is_active }
            name={ item.name }
            navigation={ navigation }
            notes={ item.notes }
            url_image={ item.url_image }
            updated_at={ item.updated_at }
            updated_by={ item.updated_by }
        />
    );
    
    return (
        <KeyboardAvoidingView
            behavior={ (Platform.OS === 'ios') ? 'padding' : 'height' }
            style={ general.fullScreen }
        >
            <CustomHeader
                isHome={ true }
                navigation={ navigation }
                title='BIBLIOTECA'
            />

            <Image resizeMode='stretch' source={ require('../../../assets/images/bgLibrary.png') } style={{ height: 250, position: 'relative', width: '100%' }} />
            <View
                style={[ general.global_margin, { marginTop: 6, }]}
            >
                <View style={{ alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between', }}>
                    <Text style={{ color: colors.black, fontSize: 21, }}>
                        Archivos
                    </Text>
                    <TouchableOpacity
                        activeOpacity={ colors.opacity }
                        style={{ alignItems: 'center', backgroundColor: colors.primary, height: 48, justifyContent: 'center', right: -20, width: 62, }}
                    >
                        <Icon
                            size={ 30 }
                            name='options-outline'
                            color={ colors.white }
                        />
                    </TouchableOpacity>
                </View>
            </View>
            
            <View style={[ general.global_margin, { flex: 1, }]}>
                <FlatList
                    data={ response }
                    renderItem={ renderOption }
                    keyExtractor={ item => item.id }
                    showsVerticalScrollIndicator={ false }
                />
            </View>
        </KeyboardAvoidingView>
    )
}

export default LibraryScreen;