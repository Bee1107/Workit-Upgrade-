import React from 'react'
import { View, StyleSheet, Image } from 'react-native'
import ActionButton from '../../components/ActionButton'
import SemiHeading from '../text/SemiHeading'

const EmptyImageVIew = ( { image, style={}, buttonTitle, message, onPress }) => (
    <View style={[styles.container, style]}>
         <View style={{justifyContent: 'center', alignItems:'center' }}>
            <Image source={image} style={{width: 120, height: 120}} resizeMode="contain" />
            <SemiHeading style={{ marginTop: 20 }}>{message}</SemiHeading>
        </View>

       {onPress && (
            <ActionButton 
            text={buttonTitle} 
            onPress={onPress}
            style={{width:'100%', marginTop: 20}}
            />
       )}

    </View>
)

const styles = StyleSheet.create({
    container:{
        flex: 1, 
        alignItems: 'center', 
        justifyContent:'center',
    },
    lottie:{
        alignSelf:'center',
    },
})

export default EmptyImageVIew