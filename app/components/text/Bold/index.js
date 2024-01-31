
import React from 'react'
import { Text, StyleSheet } from 'react-native'
import colors from '../../../utils/colors'


const Label = ({ children, style, color=colors.secondColor, fontSize=14 }) => {
    return (   
        <Text style={[styles.container, style, {color, fontSize}]}>{children}</Text>
    )
}

const styles = StyleSheet.create({
    container:{
        fontSize: 12,
        fontFamily:'Poppins-Bold',
        textAlign:'center'
    }
})

export default Label