import React, { useState } from 'react';
import { Alert, Modal, StyleSheet, Text, Pressable, View } from 'react-native';

import { colors } from '../../theme/customTheme';

const CustomModal = () => {
    const [modalVisible, setModalVisible] = useState(false);
    return (
        <View style={styles.centeredView}>
            <Modal
                animationType='slide'
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    Alert.alert('Modal has been closed.');
                    setModalVisible(!modalVisible);
                }}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalText}>Hello World!</Text>
                        <Pressable
                            style={[styles.button, styles.buttonClose]}
                            onPress={() => setModalVisible(!modalVisible)}
                        >
                            <Text style={styles.textStyle}>Hide Modal</Text>
                        </Pressable>
                    </View>
                </View>
            </Modal>
            <Pressable
                style={[styles.button, styles.buttonOpen]}
                onPress={() => setModalVisible(true)}
            >
                <Text style={styles.textStyle}>Show Modal</Text>
            </Pressable>
        </View>
    )
}

export default CustomModal;

const styles = StyleSheet.create({
    centeredView: {
        alignItems: 'center',
        flex: 1,
        justifyContent: 'center',
        marginTop: 22,
    },
    modalView: {
        alignItems: 'center',
        backgroundColor: colors.white,
        borderRadius: 20,
        elevation: 5,
        margin: 20,
        padding: 35,
        shadowColor: colors.black_opacity,
        shadowOffset: { height: 2, width: 0, },
        shadowOpacity: 0.25,
        shadowRadius: 4,
    },
    button: {
        borderRadius: 20,
        elevation: 2,
        padding: 10,
    },
    buttonOpen: {
        backgroundColor: '#F194FF',
    },
    buttonClose: {
        backgroundColor: '#2196F3',
    },
    textStyle: {
        color: colors.white,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
    }
});