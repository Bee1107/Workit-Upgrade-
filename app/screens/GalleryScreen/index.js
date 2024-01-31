import React from 'react'
import { View, StyleSheet, Text } from 'react-native'
import Gallery from 'react-native-image-gallery'
import colors from '../../utils/colors'

const HomeScreen = ({ route }) =>{ 

    return (
        <View style={styles.container}>
           <Gallery
                initialPage={route.params.index}
                style={{ flex: 1, backgroundColor: colors.white }}
                images={route.params.images.map( item => ({ source: {uri: item}}))}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor: colors.white,
    }
})


export default HomeScreen