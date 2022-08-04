import React from 'react'
import { ImageBackground, View } from 'react-native'

import { general } from '../../theme/customTheme';

const Background = () => {
    return (
        <>
            <ImageBackground
                resizeMode='cover'
                source={ require('../../assets/images/starter_bg.png') }
                style={ general.background }
            >
                <View style={ general.bg_opacity } />
            </ImageBackground>
        </>
    )
}

export default Background;