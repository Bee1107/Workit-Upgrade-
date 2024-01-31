import React from 'react'
import { Image, View, StyleSheet } from 'react-native'
import { images } from '../../assets'

const Ranking = ({style={}, rank = 0}) => {
    
    const items = new Array(5).fill(0);

    return (
        <View style={[styles.container, style]}>
            {items.map((item, index) => <Image key={`start_${index}`} source={(index <= rank - 1) ? images.star.fill : images.star.unfill } />)}
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
 
        flexDirection:'row',
        alignItems:'baseline'
    }
})

export default Ranking