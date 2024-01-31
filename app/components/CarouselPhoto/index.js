import React from 'react'
import { View, StyleSheet,Dimensions, TouchableOpacity, Image, FlatList } from 'react-native'
import SkeletonPlaceholder from 'react-native-skeleton-placeholder'
import { useNavigation } from '@react-navigation/native'
import { CachedImage } from 'react-native-img-cache'
import colors from '../../utils/colors'

const windowWidth = Dimensions.get('window').width

const SkeletonView = () => {
  return (
    <View style={{width: windowWidth, height: 180, paddingHorizontal: 20}}>
    <SkeletonPlaceholder backgroundColor={colors.skeleton.backgroundColor} highlightColor={colors.skeleton.highlightColor}>
      <View style={{flexDirection:'row', justifyContent:'space-between', marginTop: 10}}>
        <View  style={{width: 160, height: 160, borderRadius: 8}} />
        <View  style={{width: 160, height: 160, borderRadius: 8, marginLeft: 10}} />
        <View  style={{width: 160, height: 160, borderRadius: 8, marginLeft: 10}} />
      </View>
    </SkeletonPlaceholder>
  </View>
  ) 
}

const CarouselPhoto = ({ images, isLoading }) => {

    const navigation = useNavigation()

    const onPress = index => () => navigation.navigate('Gallery', { images, index })

    return (
        <>
        {isLoading && <SkeletonView />}
        {!isLoading && (
            <FlatList
                data={images}
                horizontal={true}
                renderItem={({item, index})=>(
                    <TouchableOpacity 
                        key={`image_${index}`}
                        onPress={onPress(index)}  
                        style={styles.thumContainer}>
                        <View style={styles.thumb}>
                            <CachedImage source={{uri: item}} style={styles.image}  />
                        </View>
                    </TouchableOpacity>
                )}
                keyExtractor={(item) => `image_${item}`}
                style={styles.list}
            />
        )}
        </>
    )
}

const styles = StyleSheet.create({
    thumContainer:{
        padding: 5
    },
    thumb: {
        borderRadius: 20,
        overflow: 'hidden'
    },
    image: {
        width: 160,  
        height: 160
    },
    list:{
        marginTop: 20, 
        height: 180
    }
})

export default CarouselPhoto