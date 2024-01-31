import React from 'react'
import { View, Image, StyleSheet } from 'react-native'
import Label from '../../../components/text/Label'
import colors from '../../../utils/colors'

const CategoryCapsule = ({ category }) => {
    const { color1, image, category_name} = category
    return (
        <View style={[styles.capsule, { backgroundColor: color1}]}>
            <Image source={{ uri: image}} style={{width: 24, height: 24}} resizeMode="contain"  />
            <Label color="white" fontSize={12} style={{marginLeft: 5, flex: 1}}>{category_name}</Label>
        </View>
    )
}


const styles = StyleSheet.create({
    capsule:{
        maxWidth: 140,
        flexDirection: 'row',
        backgroundColor: colors.card.green,
        paddingVertical: 4,
        paddingHorizontal: 10,
        borderRadius: 20,
        marginTop: 10,
        alignSelf:'baseline',
        alignItems:'center'
    }
})

export default CategoryCapsule