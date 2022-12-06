import React, { useEffect, useCallback, useContext, useState } from 'react';
import {
    FlatList, KeyboardAvoidingView, Platform, StyleSheet, RefreshControl,
    TouchableOpacity, View, ActivityIndicator, Text, Alert
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

import { AuthContext } from '../../../context/AuthContext';
import { ProspectsContext } from '../../../context/ProspectsContext';
import useForm from '../../../hooks/useForm';
import useFetch from '../../../hooks/useFetch';
import { SwipeListView } from 'react-native-swipe-list-view';
import { CustomHeader } from '../../../components/Layout/CustomHeader';
import CustomInput from '../../../components/CustomInput';
import { CustomContact } from '../../../components/FlatList/CustomContact';

import { Navigation } from '../../../helpers/interfaces/appInterfaces';
import { colors, general } from '../../../theme/customTheme';
import { ScrollView } from 'react-native-gesture-handler';

const wait = (timeout: any) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
}
const ProspectsScreen = ({ navigation }: Navigation) => {
    const { user } = useContext(AuthContext);
    const { prospects, loadProspects, addPointCall, deleteProspect } = useContext(ProspectsContext);
    const agentId = user?.id;

    const [filterProspects, setFilterProspects] = useState();
    const [searchData, setSearchData] = useState(false);

    const [refreshing, setRefreshing] = React.useState(false);

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        wait(200).then(() => setRefreshing(false));
    }, []);

    useEffect(() => {
        loadProspects()

    }, [navigation])

    const { search, onChange } = useForm({
        search: '',
    });

    const clearInput = useCallback(() => onChangeText(''), []);

    const onChangeText = (value: string) => {
        onChange(value, 'search')
        if (value) {
            const newData: any = prospects.filter((item: any) => {
                const itemData = item.name ? item.name.toLowerCase() : ''.toLowerCase();
                const numberData = item.phone && item.phone;
                const textData = value.toLowerCase();
                return (itemData.indexOf(textData) > -1 || numberData.indexOf(textData) > -1);
            })
            setFilterProspects(newData);
            setSearchData(true);
        } else {
            setFilterProspects(prospects);
            setSearchData(false);
        }
    }

    const renderOption = ({ item }: any) => (
        <CustomContact
            name={item.name}
            first_name={item.first_name}
            phone={item.phone}
            id={item.id}
            type={item.policy_type}
        />
    );

    const renderHiddenItem = (data: any, rowMap: any) => (
        <View style={styles.rowBack}>
            <TouchableOpacity
                style={[styles.backRightBtn, styles.backRightBtnLeft]}
                onPress={() => navigation.navigate('ProspectEditScreen', data.item)}
            >
                <Text style={styles.backTextWhite}>Editar</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={[styles.backRightBtn, styles.backRightBtnRight]}
                onPress={() => {
                    Alert.alert(
                        "Alerta",
                        "Estas seguro que desea ELIMINAR el contacto?",
                        [
                            {
                                text: "No",
                            },
                            {
                                text: "Si",
                                onPress: () => {
                                    deleteProspect(data.item.id),
                                    loadProspects()
                                }
                            }
                        ]
                    );
                }}
            >
                <Text style={styles.backTextWhite}>Eliminar</Text>
            </TouchableOpacity>
        </View>
    );
    return (
        <KeyboardAvoidingView
            behavior={(Platform.OS === 'ios') ? 'padding' : 'height'}
            style={general.fullScreen}

        >
            <CustomHeader
                isHome={true}
                navigation={navigation}
                title='DIRECTORIO'
            />

            <View style={general.global_margin}>
                <CustomInput
                    nameIcon={!searchData ? 'search' : 'close'}
                    onChangeText={onChangeText}
                    onPress={clearInput}
                    placeholder='Buscar'
                    type='TERTIARY'
                    value={search}
                />
            </View>
            <View style={general.fullScreen}>
                {prospects.length > 0
                    ? <SwipeListView
                        data={filterProspects ? filterProspects : prospects}
                        renderItem={renderOption}
                        refreshControl={<RefreshControl
                            refreshing={refreshing}
                            onRefresh={() => {
                                loadProspects(),
                                    onRefresh()
                            }
                            }
                        />}
                        disableRightSwipe
                        rightOpenValue={-150}
                        previewRowKey={'0'}
                        previewOpenValue={-40}
                        previewOpenDelay={3000}
                        renderHiddenItem={renderHiddenItem}
                    />
                    : <ActivityIndicator size="small" color="#0000ff" />}
            </View>

            <TouchableOpacity
                activeOpacity={colors.opacity}
                onPress={() => navigation.navigate('ProspectScreen', agentId)}
                style={styles.add_button}
            >
                <Icon
                    color={colors.primary}
                    name='plus'
                    size={18}
                />
            </TouchableOpacity>
        </KeyboardAvoidingView>
    )
}

export default ProspectsScreen;

const styles = StyleSheet.create({
    item_card: {
        alignItems: 'center',
        backgroundColor: colors.white,
        flexDirection: 'row',
        height: 80,
        justifyContent: 'space-between',
        marginBottom: 1,
    },
    icon_container: {
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
    },
    info_title: {
        color: colors.black,
        fontSize: 15,
        fontWeight: 'bold',
        marginBottom: 6,
    },
    info_text: {
        color: colors.black_opacity,
        fontSize: 12,
    },
    info_container: {
        flexDirection: 'row',
        marginRight: 14,
    },
    social_icon: {
        alignItems: 'center',
        borderRadius: 4,
        height: 20,
        justifyContent: 'center',
        width: 20,
    },
    add_button: {
        alignItems: 'center',
        backgroundColor: colors.white,
        borderRadius: 100,
        bottom: 34,
        elevation: 3,
        justifyContent: 'center',
        height: 62,
        position: 'absolute',
        right: 18,
        shadowColor: colors.black_opacity,
        shadowOffset: { height: 2, width: 0, },
        width: 62,
    },
    backTextWhite: {
        color: colors.white,
    },
    rowFront: {
        alignItems: 'center',
        backgroundColor: '#CCC',
        justifyContent: 'center',
        height: 50,
    },
    rowBack: {
        alignItems: 'center',
        backgroundColor: '#DDD',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingLeft: 15,
    },
    backRightBtn: {
        alignItems: 'center',
        height: '99%',
        justifyContent: 'center',
        position: 'absolute',
        top: 0,
        width: 75,
    },
    backRightBtnLeft: {
        backgroundColor: 'gray',
        right: 75,
    },
    backRightBtnRight: {
        backgroundColor: 'red',
        right: 0,
    },
})