import React, { useEffect, useContext, useState } from 'react';
import {
    ScrollView, KeyboardAvoidingView, ActivityIndicator, FlatList, Modal, RefreshControl,
    LogBox, Platform, StyleSheet, Text, TouchableOpacity, View, Image
} from 'react-native';
import CustomInput from './../../components/CustomInput'
import CustomButton from '../../components/CustomButton';
import Icon from 'react-native-vector-icons/FontAwesome5';
import ProgressBar from '../../components/ProgressBar';
import RNSpeedometer from 'react-native-speedometer';
import { Alert } from 'react-native';
import { AccordionItem } from 'react-native-accordion-list-view';
import { colors, general } from '../../theme/customTheme';
import { SPEEDOMETER_LABELS } from '../../config/defines';
import { GoalContext } from '../../context/GoalContext';
import { Navigation } from '../../helpers/interfaces/appInterfaces';
import { CustomHomeHeader } from '../../components/Layout/CustomHeader';

const initialState = {
    personalGoal: ''
}

const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
}
const DashboardScreen = ({ navigation }: Navigation) => {
    const { progress, fetching, modalVisible, setModalVisibilityState, updatePersonalGoal, fetchGame }: any = useContext(GoalContext);
    const [headerState, setHeaderState] = useState<HeaderStateType>(initialState);
    const [idGame, setIdGame] = useState<number>(0);
    const [refreshing, setRefreshing] = React.useState(false);

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        wait(2000).then(() => setRefreshing(false));
    }, []);

    useEffect(() => {
        // fetchPersonalGoal()
        fetchGame()
        LogBox.ignoreLogs(['VirtualizedLists should never be nested'])
    }, [])

    const RenderSpeedometer = () => {

        return (
            progress.map((item: any, i: number) => {
                return (
                    <View key={item.id}>
                        <AccordionItem
                            isRTL={true}
                            taco={
                                i == 0 || i == 1

                            }
                            key={item.id}
                            containerStyle={styles.borderCard}
                            customTitle={() =>
                                <View style={{ flexDirection: 'column' }}>
                                    <Text style={styles.textCard}>{item.name}</Text>
                                    <View style={{ flexDirection: 'row' }}>
                                        {
                                            item.progress.goal
                                                ?
                                                <ProgressBar
                                                    current={item.progress.policies_sold_amount ? item.progress.policies_sold_amount : 0}
                                                    total={item.progress.goal}
                                                    percentage={item.progress.goal_percentage ? item.progress.goal_percentage : 0}
                                                />
                                                :
                                                <ProgressBar
                                                    current={0}
                                                    total={0}
                                                    percentage={0}
                                                />
                                        }
                                        <Image
                                            resizeMode='stretch'
                                            source={require('../../assets/images/logoColor.png')}
                                            style={{ width: 40, height: 40, margin: 5 }}
                                        />
                                    </View>
                                </View>
                            }
                            customBody={() =>
                                <View style={{ padding: 2, overflow: 'hidden' }}>
                                    {
                                        <View>

                                            <View style={{ margin: 10, flexDirection: "column", }}>
                                                <View style={{ justifyContent: 'center' }}>
                                                    <Text style={{ marginBottom: 25, color: "#005691", textAlign: 'center', fontSize: 15, fontWeight: '700' }}>CONOCE TU PROGRESO</Text>
                                                    {

                                                        item.progress.goal
                                                            ?
                                                            <RNSpeedometer
                                                                value={item.progress.policies_sold_amount ? item.progress.policies_sold_amount : 0}
                                                                size={250}
                                                                minValue={0}
                                                                maxValue={item.progress.goal}
                                                                labels={SPEEDOMETER_LABELS}
                                                                innerCircleStyle={{ backgroundColor: '#F5F5F5' }}
                                                            />
                                                            :
                                                            <RNSpeedometer
                                                                value={0}
                                                                size={250}
                                                                minValue={0}
                                                                maxValue={10000}
                                                                labels={SPEEDOMETER_LABELS}
                                                                innerCircleStyle={{ backgroundColor: '#F5F5F5' }}
                                                            />
                                                    }
                                                </View>

                                            </View>
                                            <TouchableOpacity
                                                onPress={() => { setModalVisibilityState(!modalVisible), setIdGame(item.id) }}
                                                style={{ justifyContent: 'center', margin: 15, marginBottom: 5, alignItems: 'flex-end' }}
                                            >
                                                <Icon
                                                    name='flag'
                                                    color={colors.blue}
                                                    size={30}
                                                />
                                            </TouchableOpacity>
                                        </View >
                                    }
                                </View >
                            }
                            animationDuration={400}
                        />
                    </View>
                )
            })
        )
    }

    return (
        <KeyboardAvoidingView
            behavior={(Platform.OS === 'ios') ? 'padding' : 'height'}
            style={general.fullScreen}
        >
            <CustomHomeHeader
                navigation={navigation}
            />
            <ScrollView style={general.global_margin}

                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={() => {
                            fetchGame()
                            onRefresh()
                        }
                        }
                    />
                }>
                {
                    progress != ''
                        ?
                        RenderSpeedometer()
                        :
                        null
                }
                <View style={styles.container_views}>
                    <TouchableOpacity activeOpacity={colors.opacity} onPress={() => navigation.navigate('Directorio')} style={styles.body_card}>
                        <View style={styles.icon}>
                            <Icon color={colors.white} name='address-book' size={25} />
                        </View>
                        <Text style={styles.subtitle}>Directorio</Text>
                        <View style={styles.footer_card}>
                            <Text style={styles.title}>Directorio</Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity activeOpacity={colors.opacity} onPress={() => navigation.navigate('Agenda')} style={styles.body_card}>
                        <View style={styles.icon}>
                            <Icon color={colors.white} name='book' size={25} />
                        </View>
                        <Text style={styles.subtitle}>Agenda</Text>
                        <View style={styles.footer_card}>
                            <Text style={styles.title}>Agenda</Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity activeOpacity={colors.opacity} onPress={() => navigation.navigate('Bitácora')} style={styles.body_card}>
                        <View style={styles.icon}>
                            <Icon color={colors.white} name='flag' size={25} />
                        </View>
                        <Text style={styles.subtitle}>Bitácora</Text>
                        <View style={styles.footer_card}>
                            <Text style={styles.title}>Bitácora</Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity activeOpacity={colors.opacity} onPress={() => navigation.navigate('Póliza')} style={styles.body_card}>
                        <View style={styles.icon}>
                            <Icon color={colors.white} name='file-contract' size={25} />
                        </View>
                        <Text style={styles.subtitle}>Póliza</Text>
                        <View style={styles.footer_card}>
                            <Text style={styles.title}>Póliza</Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity activeOpacity={colors.opacity} onPress={() => navigation.navigate('Top 10')} style={styles.body_card}>
                        <View style={styles.icon}>
                            <Icon color={colors.white} name='trophy' size={25} />
                        </View>
                        <Text style={styles.subtitle}>Top 10</Text>
                        <View style={styles.footer_card}>
                            <Text style={styles.title}>Top 10</Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity activeOpacity={colors.opacity} onPress={() => navigation.navigate('Biblioteca')} style={styles.body_card}>
                        <View style={styles.icon}>
                            <Icon color={colors.white} name='book-open' size={25} />
                        </View>
                        <Text style={styles.subtitle}>Biblioteca</Text>
                        <View style={styles.footer_card}>
                            <Text style={styles.title}>Biblioteca</Text>
                        </View>
                    </TouchableOpacity>
                </View>
                <View
                    style={{
                        flex: 1,
                        justifyContent: "center",
                        alignItems: "center",
                        marginTop: 22
                    }}
                >
                    <Modal
                        animationType="fade"
                        transparent={true}
                        style={{ backgroundColor: 'red' }}
                        visible={modalVisible}
                        onRequestClose={() => {
                            Alert.alert("Modal has been closed.");
                            setModalVisibilityState(!modalVisible)
                        }}
                    >
                        <View style={{ flexDirection: 'row', backgroundColor: 'rgba(0,0,0,0.5)', flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                            <View style={{ backgroundColor: '#f5f5f5', flex: 1, marginLeft: 25, marginRight: 25, padding: 25, borderRadius: 15 }}>
                                <Text style={{ fontSize: 18, marginBottom: 15 }}>Agrega tu meta personal</Text>
                                <CustomInput
                                    keyboardType="numeric"
                                    maxLength={8}
                                    onChangeText={(value: string) => setHeaderState((state: HeaderStateType) => ({ ...state, personalGoal: value }))}
                                    placeholder='Meta personal'
                                    value={headerState.personalGoal}
                                />
                                <View>
                                    <CustomButton
                                        onPress={() => updatePersonalGoal(headerState.personalGoal, idGame)}
                                        title='Agregar'
                                    />
                                    <CustomButton
                                        onPress={() => setModalVisibilityState(!modalVisible)}
                                        title='Cancelar'
                                        type="SECONDARY"
                                    />
                                </View>


                            </View>
                        </View>
                    </Modal>
                </View>
            </ScrollView>

        </KeyboardAvoidingView >
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
        marginTop: 8,
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
    borderCard: {
        marginTop: 10,
        padding: 2,
        flex: 1,
        borderRadius: 4,
        borderColor: 'gray',
        elevation: 3
    },
    textCard: {
        marginLeft: 3,
        fontSize: 15,
        fontWeight: 'bold',
        color: '#005691',
        elevation: 3
    },
})