import React, { useEffect, useContext } from 'react';
import { ScrollView, KeyboardAvoidingView, ActivityIndicator, LogBox, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

import { Navigation } from '../../helpers/interfaces/appInterfaces';

import { CustomHomeHeader } from '../../components/Layout/CustomHeader';
import ProgressBar from '../../components/ProgressBar';

import { colors, general } from '../../theme/customTheme';
import { SPEEDOMETER_LABELS } from '../../config/defines';
import RNSpeedometer from 'react-native-speedometer'
import { GoalContext } from '../../context/GoalContext';

const DashboardScreen = ({ navigation }: Navigation) => {
    const { progress, fetching, fetchPersonalGoal }: any = useContext(GoalContext);
    
    useEffect(() => {
        fetchPersonalGoal()
        LogBox.ignoreLogs(['VirtualizedLists should never be nested'])
    }, [])

    const RenderSpeedometer = () => {
        return (
            progress.goal
            ?   <View style={{ marginTop: 15 }}>
                    <View style={{ height: 220 }}>
                        <RNSpeedometer 
                            value={progress.policies_sold_amount} 
                            size={300}
                            minValue={0}
                            maxValue={progress.goal}
                            labels={ SPEEDOMETER_LABELS }
                            innerCircleStyle={{ backgroundColor: '#F5F5F5' }}
                        />
                    </View>
                    <ProgressBar 
                        current={progress.policies_sold_amount} 
                        total={progress.goal} 
                        percentage={progress.goal_percentage} 
                    />
                </View>
            :   <View style={{ marginVertical: 15 }}>
                    <Text 
                        style={{ color: '#005691', fontSize: 20, textAlign: 'center' }}>
                            Aun no ha asignado su meta personal.
                    </Text>
                </View>
        )
    }

    return (
        <KeyboardAvoidingView
            behavior={ (Platform.OS === 'ios') ? 'padding' : 'height' }
            style={ general.fullScreen }
        >
            <CustomHomeHeader
                navigation={ navigation }
            />

            <ScrollView style={ general.global_margin }>

                {!fetching
                    ?   <RenderSpeedometer />
                    :   <ActivityIndicator style={{marginVertical: 10}} size="large" color="#0000ff" />
                } 

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