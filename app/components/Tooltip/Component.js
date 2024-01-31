import React, { useEffect } from 'react'
import { StyleSheet, Image, View, TouchableOpacity } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import Label from '../text/Label'
import { images } from '../../assets'

const Tooltip = ({ message, style={}, tooltipKey='', save, storage, read }) => {


    useEffect(() => {
        read()
    }, [])

    const onPress = () => {
        save({
            [tooltipKey]: true
        })
    }

    return (
        <>
        {storage[tooltipKey] && null}
        {!storage[tooltipKey] && (
             <View style={style}>
             <Image source={images.arrowTooltip} style={styles.arrow} />
             <LinearGradient colors={['#396afc','#2948ff']} style={styles.gradient}   >
             <Label color="white" style={{flex: 1}}>{message}</Label>
             <TouchableOpacity style={{width: 16}} onPress={onPress}>
                 <Image source={images.close.default} style={styles.close} resizeMode="contain" />
             </TouchableOpacity>
         </LinearGradient>
         </View>
        )}
       
        </>
    )
}

const styles = StyleSheet.create({
    gradient:{
        borderRadius: 10,
        padding: 10,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    close:{
        width: 16,
        height: 16
    },
    arrow:{
        width: 10,
        height: 10,
        marginLeft: 20
    }
})

export default Tooltip