import React from 'react'
import { View, StyleSheet, Image} from 'react-native'

import Label from '../../components/text/Label'
import ActionButton from '../../components/ActionButton'
import colors from '../../utils/colors'

const EmptyView = ( { image, style={}, buttonTitle, message, onPress, size = 300, loop=true}) => (
    <View style={[styles.container, style]}>
        {image && (
            <Image source={image} style={{width: 160}} resizeMode="contain" />
        )}
        <Label fontSize={16} color={colors.text.subtitle} style={{marginTop: -5}}>{message}</Label> 

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

export default EmptyView