import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import { colors } from '../../theme/customTheme';

export const CustomCard = (item: any) => {
    return (
        <>
            {
                <View style={ card.container }>
                    <TouchableOpacity
                        activeOpacity={ colors.opacity }
                        onPress={ () => item.navigation.navigate('LibraryDetail', item) }
                        style={ card.card }
                    >
                        <View style={ card.content_image }>
                            <Image
                                resizeMode='cover'
                                source={{ uri: item.url_image }}
                                style={ card.card_image }
                            />
                        </View>
                        <View style={ card.card_content }>
                            <Text style={ card.content_title }>
                                { item.name }
                            </Text>
                            <Text
                                numberOfLines={ 3 }
                                style={[ card.content_text, { marginBottom: 8, }]}
                            >
                                { item.description }
                            </Text>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                <Text style={[ card.content_text, { color: colors.gray_opacity }]}>
                                    Categoría: { item.category }
                                </Text>
                                <Icon
                                    name='checkmark-circle'
                                    color={ colors.primary }
                                    size={ 18 }
                                />
                            </View>
                        </View>
                    </TouchableOpacity>
                </View>
            }
        </>
    );
}

const card = StyleSheet.create({
    container: {
        height: 130,
        marginVertical: 16,
    },
    card: {
        alignSelf: 'center',
        backgroundColor: colors.white,
        elevation: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        padding: 14,
        shadowOffset: { height: 2, width: 0, },
        shadowColor: colors.black_opacity,
        width: '100%',
    },
    content_image: {
        marginHorizontal: 5,
        width: 100,
    },
    card_image: {
        alignSelf: 'center',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        width: '100%',
    },
    card_content: {
        flex: 1,
        marginHorizontal: 5,
    },
    content_title: {
        color: colors.black,
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    content_text: {
        fontSize: 15,
    },
})