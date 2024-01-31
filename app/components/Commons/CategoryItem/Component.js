import React, { useEffect } from 'react'
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Dimensions
} from 'react-native'

import Label from '../../../components/text/Label'
import Heading from '../../../components/text/Heading'
import colors from '../../../utils/colors'
import RadialGradient from 'react-native-radial-gradient'
import { shadeColor } from '../../../utils/String'

import { CachedImage } from 'react-native-img-cache'
const windowWidth = Dimensions.get('window').width
const radius = (windowWidth / 3 - 40) 

const CategoryItem = ({  index, get, cluster, onPress, category, showBadge = false }) => {

    const width = (windowWidth - 80) / 4
    const tintColor = (category && category.category) ? category.category.color1 : colorsMap[index].ligth

    useEffect(() => {
      if(showBadge){
        get({ item: category })
      }
    }, [])
  
    return (
      <TouchableOpacity onPress={() => {
        onPress({ index, category })
      }} style={[styles.item, { flex: 1 }]}>
           <RadialGradient
            colors={[shadeColor(tintColor, 20), tintColor]}
            stops={[0.5]}
            center={[radius / 2, radius/2]}
            radius={radius / 2}
            style={[styles.itemBox, {width, height: width}]} >
            {category && category.image && (
              <CachedImage source={{uri: category.image}} mutable style={{position: 'absolute', top: (width - 31) / 2,  left:(width - 31) / 2,width: 31, height: 31 }} resizeMode="contain" />
            )}
           </RadialGradient>
           {cluster[category.category.category_id] && showBadge && (
              <View style={styles.bullet}>
                <Heading color="white">{cluster[category.category.category_id]}</Heading>
              </View>
           )}
           <Label color={colors.text.subtitle} fontSize={12} style={{marginTop: 10, textAlign: 'center'}}>{category.name}</Label>
      </TouchableOpacity>
    )
  
   
  }

  const styles = StyleSheet.create({
    item:{
      alignItems:'center',
    },
    itemBox:{
      borderRadius: 30,
      overflow:'hidden',
  },
  bullet:{
    position: 'absolute',
    top:0,
    right: 0,
    width: 30,
    height: 30,
    backgroundColor:'red',
    padding: 5,
    alignItems:'center',
    justifyContent: 'center',
    borderRadius: 20
  }
  })

  export default CategoryItem