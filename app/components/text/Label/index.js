
import React from 'react'
import { Text, StyleSheet, } from 'react-native'
import colors from '../../../utils/colors'

const Label = ({ children, style = {}, color= colors.text.subtitle, fontSize=14, numberOfLines=0, fontFamily= 'Poppins-Regular' }) => {
    return (   
        <Text  numberOfLines={numberOfLines} style={[styles.container, style, {color, fontSize, fontFamily}]}>{children}</Text>
    )
}

const styles = StyleSheet.create({
    container:{
        fontSize: 12,
        includeFontPadding:false,
    }
})

export default Label