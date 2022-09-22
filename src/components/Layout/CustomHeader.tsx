import React, { useEffect, useState, useContext } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View, Modal, Alert, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import ideasApi from '../../api/ideasApi';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { AuthContext } from '../../context/AuthContext';

import { colors } from '../../theme/customTheme';
import CustomInput from './../../components/CustomInput'
import CustomButton from './../../components/CustomButton'

interface Props {
    title?:         string;
    isHome?:        any;
    navigation?:    any;
}

type HeaderStateType = {
    fetching: boolean,
    modalVisible: boolean,
    personalGoal: string
}

const initialState = {
    fetching: false,
    modalVisible: false,
    personalGoal: ''
}

export const CustomHeader = ({ title, isHome, navigation }: Props) => {    
    const openDrawer = () => {
        navigation.openDrawer();
    }

    return (
        <View style={[ header.container_view, header.container_PRIMARY ]}>
            {
                isHome ?
                    <>
                        <View></View>
                        <Text style={ header.title }>{ title }</Text>
                    </>
                :
                    <View style={ header.container }>
                        <TouchableOpacity
                            activeOpacity={ colors.opacity }
                            onPress={ () => navigation.goBack() }
                            style={{ flexDirection: 'row', alignItems: 'center' }}
                        >
                            <Icon
                                name='chevron-back-outline'
                                color={ colors.white }
                                size={ 25 }
                            />
                            <Text style={ header.textBack }>Regresar</Text>
                        </TouchableOpacity>
                    </View>
            }
            {
                isHome &&
                    <TouchableOpacity
                        activeOpacity={ colors.opacity }
                        onPress={ openDrawer }
                    >
                        <Icon
                            name='menu'
                            color={ colors.white }
                            size={ 25 }
                        />
                    </TouchableOpacity>
            }
        </View>
    )
}

export const CustomHomeHeader = ({ navigation }: Props) => {
    const { user } = useContext(AuthContext);
    const [headerState, setHeaderState] = useState<HeaderStateType>(initialState);

    useEffect(() => {
      console.log("Rendered Header")
    })
    
    
    const openDrawer = () => {
        navigation.openDrawer();
    }

    const handleAddPersonalGoal = async() => {
        try {
            if(headerState.personalGoal !== ''){
                setHeaderState((state: HeaderStateType) => ({ ...state, fetching: !state.fetching }))
                const localStorage = await AsyncStorage.getItem('userIdeas');
                const user = localStorage != null ? JSON.parse(localStorage) : null
                const { data }: any = await ideasApi.put(`/goals/${user.id}`, { "goal": headerState.personalGoal })

                if(!data.status){
                    Alert.alert("Ya ha asignado una meta personal.");
                }else{
                    Alert.alert("Meta personal asignada correctamente.");
                }

                setHeaderState((state: HeaderStateType) => ({ 
                    ...state, 
                    fetching: !state.fetching,
                    modalVisible: !state.modalVisible 
                }))
            }else{
                Alert.alert("Es necesario que introdusca su meta personal.");
            }

        } catch (error) {
            setHeaderState((state: HeaderStateType) => ({ 
                ...state, 
                fetching: !state.fetching,
                modalVisible: !state.modalVisible 
            }))
            Alert.alert("Por el momento no ha sido posible actualizar su meta personal, favor de intentarlo mas tarde.");
        }
        
    }

    return (
        <View style={[ header.container_view, header.container_SECONDARY ]}>
            <View style={{ flexDirection: 'row', paddingTop: 30, }}>
                <View style={{ height: 50, width: 50, }}>
                    <Image
                        source={ require('../../assets/images/user.png') }
                        style={ header.image }
                    />
                </View>
                <View style={{ justifyContent: 'center', marginLeft: 25, flex: 1 }}>
                    <Text style={ header.text }>Hola, <Text style={{ fontWeight: 'normal' }}>{ user?.name }</Text></Text>
                    <Text style={ header.subText }>Sigue cumpliendo tus metas</Text>
                </View>
                <TouchableOpacity 
                    onPress={() => setHeaderState((state: HeaderStateType) => ({ ...state, modalVisible: !state.modalVisible }))}
                    style={{ justifyContent: 'center', marginLeft: 25, }}
                >
                    <Icon
                        name='flag'
                        color={ colors.white }
                        size={ 25 }
                    />
                </TouchableOpacity>
            </View>
            {/* <CustomModal /> */}
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
                    visible={headerState.modalVisible}
                    onRequestClose={() => {
                        Alert.alert("Modal has been closed.");
                        setHeaderState((state: HeaderStateType) => ({ ...state, modalVisible: !state.modalVisible }))
                    }}
                >
                    <View style={{ flexDirection: 'row', backgroundColor: 'rgba(0,0,0,0.5)', flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <View style={{ backgroundColor: '#f5f5f5', flex: 1, marginLeft: 25, marginRight: 25, padding: 25, borderRadius: 15 }}>
                            <Text style={{ fontSize: 18, marginBottom: 15 }}>Agrega tu meta personal</Text>
                            <CustomInput
                                keyboardType="numeric"
                                maxLength={8}
                                onChangeText={ (value: string) => setHeaderState((state: HeaderStateType) => ({ ...state, personalGoal: value })) }
                                placeholder='Meta personal'
                                value={headerState.personalGoal}
                            />
                            {!headerState.fetching
                                ?   <View>
                                        <CustomButton
                                            onPress={ () => handleAddPersonalGoal() }
                                            title='Agregar'
                                        />
                                        <CustomButton
                                            onPress={ () => setHeaderState((state: HeaderStateType) => ({ ...state, modalVisible: !state.modalVisible }))}
                                            title='Cancelar'
                                            type="SECONDARY"
                                        />
                                    </View>
                                :   <ActivityIndicator size="small" color="#0000ff" />
                            }
                            
                        </View>
                    </View>
                </Modal>
            </View>
            <TouchableOpacity
                activeOpacity={ colors.opacity }
                onPress={ openDrawer }
                style={{ top: 25, right: 20, position: 'absolute', }}
            >
                <Icon
                    name='menu'
                    color={ colors.white }
                    size={ 25 }
                />
            </TouchableOpacity>
        </View>
    )
}

const header = StyleSheet.create({
    container_view: {
        alignItems: 'center',
        backgroundColor: colors.primary,
        width: '100%',
    },
    container_PRIMARY: {
        flexDirection: 'row',
        height: 70,
        justifyContent: 'space-between',
        paddingHorizontal: 20,
    },
    container_SECONDARY: {
        flexDirection: 'row',
        height: 120,
        justifyContent: 'space-between',
        paddingHorizontal: 20,
    },
    container: {
        alignItems: 'center',
        flexDirection: 'row',
        height: 50,
        justifyContent: 'space-between',
    },
    image: {
        backgroundColor: colors.white,
        borderColor: colors.white,
        borderRadius: 100,
        borderWidth: 2,
        height: '100%',
        width: '100%',
    },

    slogan: {
        height: 35,
    },
    title: {
        color: colors.white,
        fontSize: 25,
        fontWeight: 'bold',
        textAlign: 'left',
    },
    text: {
        color: colors.white,
        fontSize: 14,
        fontWeight: 'bold',
    },
    subText: {
        color: colors.white,
        fontSize: 11,
    },
    textBack: {
        color: colors.white,
        fontSize: 15,
        marginLeft: 5,
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
      },
      modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
      },
      button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2
      },
      buttonOpen: {
        backgroundColor: "#F194FF",
      },
      buttonClose: {
        backgroundColor: "#2196F3",
      },
      textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
      },
      modalText: {
        marginBottom: 15,
        textAlign: "center"
      }
})