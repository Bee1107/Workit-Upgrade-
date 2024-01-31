import React from 'react'
import { Image, View, StyleSheet } from 'react-native'
import { images } from '../../assets'
import colors from '../../utils/colors'

const SplashScreen = () => (
    <View style={styles.container} >
        <Image source={images.splash_logo} style={{width: 140, height: 140}} resizeMode="contain" />
    </View>
)

const styles = StyleSheet.create({
    container:{
        flex: 1, 
        backgroundColor: colors.white, 
        justifyContent:'center', 
        alignItems: 'center'
    }
})

export default SplashScreen
