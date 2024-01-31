import React, { useState } from 'react'
import { View, Image, StyleSheet, TouchableOpacity } from 'react-native'
import { images } from '../../assets'
// import PropTypes from 'deprecated-react-native-prop-types'

const RatingButton = props => {
    
    const [rating, setRating] = useState(0)
    const { onPress } = props

    return (
        <View style={styles.container}>
            {
                Array
                .apply(null, Array(5))
                .map((e, index) => index)
                .map( index => (
                    <TouchableOpacity key={`index_${index}`} onPress={() => {
                        setRating(index  + 1)
                        onPress(index + 1)
                    }}>
                        <Image  source={((rating <= index ) ? images.star.unfill : images.star.fill)} style={styles.icon} />
                    </TouchableOpacity>
                   
                ))}
            
         
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        justifyContent:'space-between',
        flexDirection: 'row',
        height: 24
    },
    icon:{
        width: 24,
        height: 24,
    }
})

// RatingButton.prototype ={
//     onPress: PropTypes.func
// }

export default RatingButton