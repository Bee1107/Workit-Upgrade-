import React from 'react'
import { Image, StyleSheet, View } from 'react-native'
import { images } from '../../assets'
import Label from '../../components/text/Label'


const RankingBadge = ({style = {}}) => {

    return (
        <View style={[styles.ratingBadge, style]}>
            <Label fontSize={12} style={{marginLeft: 5}}>3.4</Label>
            <Image source={images.star.fill} style={styles.star} />
            
        </View>
    )
}

const styles = StyleSheet.create({
    ratingBadge:{
        flexDirection:'row',
        backgroundColor:'white',
        padding: 2,
        alignItems: 'center',
        justifyContent: 'center',
    },
    star:{
        width: 12,
        height: 12
    },
})

export default RankingBadge