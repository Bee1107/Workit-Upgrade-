
import React from 'react'
import { Text, StyleSheet } from 'react-native'
import colors from '../../../utils/colors'

const Heading = ({ children, style, fontSize = 16, color = colors.text.title }) => {
    return (   
        <Text style={[styles.container, style, { fontSize, color }]}>{children}</Text>
    )
}

const styles = StyleSheet.create({
    container:{
        fontFamily:'Poppins-Bold'
    }
})

export default Heading
