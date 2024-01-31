import React from 'react'
import { StyleSheet, View } from 'react-native'
import Heading from '../../text/Heading'

const StatusCapsule = ({ title }) => {
    return (
        <View  style={[styles.container, {backgroundColor:'#1D976C'}]}  >
            <Heading color="white">{title}</Heading>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        alignItems: 'center', 
        padding: 5, 
        borderRadius: 20, 
        marginTop: 10,
        alignSelf: 'baseline'
    }
})

export default StatusCapsule