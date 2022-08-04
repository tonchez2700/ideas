import React from 'react'
import { Image, StyleSheet, View } from 'react-native'

const CustomLogo = () => {

    return (
        <View style={ styles.logo_container }>
            <Image
                resizeMode='contain'
                source={ require('../assets/images/logoColor.png') }
                style={ styles.logo }
            />
        </View>
    )
}

export default CustomLogo;

const styles = StyleSheet.create({
    logo_container: {
        width: '100%',
    },
    logo: {
        height: 60,
        width: '100%',
    },
})