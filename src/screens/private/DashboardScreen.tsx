import React, { useEffect, useState } from 'react';
import { ScrollView, KeyboardAvoidingView, FlatList, LogBox, Platform, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

import { Navigation } from '../../helpers/interfaces/appInterfaces';
import { listRecords } from '../../helpers/data/listRecords';

import { CustomHomeHeader } from '../../components/Layout/CustomHeader';
import { CustomRecord } from '../../components/FlatList/CustomRecord';

import { colors, general } from '../../theme/customTheme';


const DashboardScreen = ({ navigation }: Navigation) => {
    const [records, setRecords] = useState();
    
    const renderOption = ({ item }: any) => (
        <CustomRecord
            message={ item.message }
            phone={ item.phone }
            title={ item.title }
        />
    );
    
    useEffect(() => {
        LogBox.ignoreLogs(['VirtualizedLists should never be nested'])
    }, [])

    return (
        <KeyboardAvoidingView
            behavior={ (Platform.OS === 'ios') ? 'padding' : 'height' }
            style={ general.fullScreen }
        >
            <CustomHomeHeader
                navigation={ navigation }
            />

            <ScrollView style={ general.global_margin }>

                <View style={ styles.container_card }>
                    <View>
                        <Text style={ styles.subtitle }>CONOCE TU PROGRESO</Text>
                        <Image
                            resizeMode='stretch'
                            source={ require('../../assets/images/mountains.png') }
                            style={{ height: 243, position: 'relative', marginTop: 15 }}
                        />
                    </View>
                    <View style={{ alignItems: 'center' }}>
                        <Text style={ styles.subtitle }>INSIGNIAS</Text>
                        <Image
                            resizeMode='stretch'
                            source={ require('../../assets/images/insignias.png') }
                            style={{ height: 194, position: 'relative', marginTop: 15 }}
                        />
                    </View>
                </View>

                <View style={ styles.container_views }>
                    <TouchableOpacity activeOpacity={ colors.opacity } onPress={ () => navigation.navigate('Directorio') } style={ styles.body_card }>
                        <View style={ styles.icon }>
                            <Icon color={ colors.white } name='address-book' size={ 25 } />
                        </View>
                        <Text style={ styles.subtitle }>Directorio</Text>
                        <View style={ styles.footer_card }>
                            <Text style={ styles.title }>Lorem</Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity activeOpacity={ colors.opacity } onPress={ () => navigation.navigate('Agenda') } style={ styles.body_card }>
                        <View style={ styles.icon }>
                            <Icon color={ colors.white } name='book' size={ 25 } />
                        </View>
                        <Text style={ styles.subtitle }>Agenda</Text>
                        <View style={ styles.footer_card }>
                            <Text style={ styles.title }>Lorem</Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity activeOpacity={ colors.opacity } onPress={ () => navigation.navigate('Bitácora') } style={ styles.body_card }>
                        <View style={ styles.icon }>
                            <Icon color={ colors.white } name='bookmark' size={ 25 } />
                        </View>
                        <Text style={ styles.subtitle }>Bitácora</Text>
                        <View style={ styles.footer_card }>
                            <Text style={ styles.title }>Lorem</Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity activeOpacity={ colors.opacity } onPress={ () => navigation.navigate('Solicitudes') } style={ styles.body_card }>
                        <View style={ styles.icon }>
                            <Icon color={ colors.white } name='file-contract' size={ 25 } />
                        </View>
                        <Text style={ styles.subtitle }>Solicitudes</Text>
                        <View style={ styles.footer_card }>
                            <Text style={ styles.title }>Lorem</Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity activeOpacity={ colors.opacity } onPress={ () => navigation.navigate('Score') } style={ styles.body_card }>
                        <View style={ styles.icon }>
                            <Icon color={ colors.white } name='trophy' size={ 25 } />
                        </View>
                        <Text style={ styles.subtitle }>Top 10</Text>
                        <View style={ styles.footer_card }>
                            <Text style={ styles.title }>Lorem</Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity activeOpacity={ colors.opacity } onPress={ () => navigation.navigate('Biblioteca') } style={ styles.body_card }>
                        <View style={ styles.icon }>
                            <Icon color={ colors.white } name='book-open' size={ 25 } />
                        </View>
                        <Text style={ styles.subtitle }>Biblioteca</Text>
                        <View style={ styles.footer_card }>
                            <Text style={ styles.title }>Lorem</Text>
                        </View>
                    </TouchableOpacity>
                </View>
                {/* <FlatList
                    data={ records ? records : listRecords }
                    renderItem={ renderOption }
                    keyExtractor={ item => item.id }
                    showsVerticalScrollIndicator={ false }
                /> */}
            </ScrollView>

        </KeyboardAvoidingView>
    )
}

export default DashboardScreen;

const styles = StyleSheet.create({
    container_card: {
        backgroundColor: colors.white,
        borderRadius: 30,
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginVertical: 20,
        padding: 20,
    },
    container_views: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    body_card: {
        alignItems: 'center',
        backgroundColor: colors.white,
        borderBottomStartRadius: 4,
        borderBottomEndRadius: 4,
        borderTopEndRadius: 18,
        borderTopStartRadius: 18,
        height: 150,
        marginBottom: 30,
        paddingTop: 18,
        width: '30%',
    },
    icon: {
        alignItems: 'center',
        backgroundColor: colors.primary,
        borderRadius: 100,
        height: 55,
        justifyContent: 'center',
        marginBottom: 12,
        width: 55,
    },
    title: {
        color: colors.white,
        fontSize: 16,
        fontWeight: 'bold',
    },
    subtitle: {
        color: colors.primary,
        fontSize: 11,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    footer_card: {
        alignItems: 'center',
        backgroundColor: colors.primary,
        borderRadius: 4,
        bottom: 0,
        height: 38,
        justifyContent: 'center',
        position: 'absolute',
        width: '100%',
    },
    item_card: {
        alignItems: 'center',
        backgroundColor: '#B2E1FF',
        borderRadius: 24,
        flexDirection: 'row',
        height: 48,
        justifyContent: 'space-between',
        marginBottom: 13,
    },
    icon_container: {
        alignItems: 'center',
        backgroundColor: colors.primary,
        borderBottomStartRadius: 24,
        borderTopEndRadius: 24,
        borderTopStartRadius: 24,
        justifyContent: 'center',
        height: '100%',
        width: 48,
    },
    info_title: {
        color: colors.black,
        fontSize: 12,
        fontWeight: 'bold',
    },
    info_text: {
        color: colors.black,
        fontSize: 10,
    },
    info_container: {
        flexDirection: 'row',
        marginRight: 14,
    },
    social_icon: {
        alignItems: 'center',
        borderRadius: 4,
        height: 22,
        justifyContent: 'center',
        width: 22,
    },
})