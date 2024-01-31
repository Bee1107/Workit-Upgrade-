import React from 'react'
import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions
} from 'react-native'

import {useNavigation} from '@react-navigation/native'
import {images} from '../../assets'
import Label from '../../components/text/Label'
import colors from '../../utils/colors'
import CategoryItem from '../../components/Commons/CategoryItem'
import SkeletonPlaceholder from 'react-native-skeleton-placeholder'

const windowWidth = Dimensions.get('window').width
const itemWidth = (windowWidth - 80) / 4

const colorsMap = [
  {
    ligth: colors.category.ligth.color1,
    dark: colors.category.dark.color1,
  },
  {
    ligth: colors.category.ligth.color2,
    dark: colors.category.dark.color2,
  },
  {
    ligth: colors.category.ligth.color3,
    dark: colors.category.dark.color3,
  },
  {
    ligth: colors.category.ligth.color4,
    dark: colors.category.dark.color4,
  }
]

const LastCategoryItem = ({ icon, text, index, onPress, category }) => {

  const tintColor = (category && category.category) ? category.category.color1 : colorsMap[index].ligth

  return (
    <TouchableOpacity onPress={onPress} style={{alignItems:'center',flex: 1}}>
        <View style={[styles.categoryItem,{width: itemWidth, height: itemWidth}]}> 
           <Image source={images.deco.rounded_category} style={{width: itemWidth, height: itemWidth, tintColor }} />
           <Image source={icon} style={{position: 'absolute', top: (itemWidth - 31) / 2,  left:(itemWidth - 31) / 2,width: 31, height: 31, tintColor:colorsMap[index].dark}} />
        </View>
        <Label color={colors.text.subtitle} fontSize={12} style={{marginTop: 10}}>{text}</Label>
    </TouchableOpacity>
  )

}

const SkeletonView = () => (
  <View style={{width: windowWidth, height: 90, paddingHorizontal: 20}}>
    <SkeletonPlaceholder>
      <View style={{flexDirection:'row', justifyContent:'space-between', marginTop: 10}}>
        <View style={styles.skeletonItem} />
        <View style={styles.skeletonItem} />
        <View style={styles.skeletonItem} />
        <View style={styles.skeletonItem} />
      </View>
    </SkeletonPlaceholder>
  </View>
) 

const getCategories = (user,user2) => {
  if(user){
    return user.myCategories ? [...user.myCategories] : []
  }

  return user2.myCategories ? [...user2.myCategories] : []
}

const PickerCategories = ({ user, overrideUser, update, onPress, isLoading , showSeeAll = false, showBadge = false, editable = false}) => {

  const navigation = useNavigation()
  const myCategories = getCategories(overrideUser, user)

  const updateCategories = (value, index) => {

      const categories = getCategories(overrideUser, user)
      
      const currentName = value.category.category_name
      const currentImage= value.category.image

      if(categories[index]){
        categories[index] = {
          ...value,
          name: currentName,
          image: currentImage,
        }
      } else {
      
        categories.push({
          ...value,
          name: currentName,
          image: currentImage,
        })
      }
      update({myCategories: categories})
  }

 

  return (
    <>
      {isLoading && <SkeletonView />}
      {!isLoading && (
        <View style={styles.container}>    
          
          {myCategories && myCategories.map( (item, index) => (
            <CategoryItem 
              index={index}
              key={`button_${index}`} 
              onPress={onPress} 
              category={item} 
              showBadge={showBadge}
            />
          ))}

          {editable && Array.apply(null, Array((myCategories) ? 3 - (myCategories ? myCategories.length : 0) : 3)).map((item,index)=>index).map(index => (
            <LastCategoryItem 
              key={`button_${index}`}
              icon={images.plusCategory} 
              onPress={() => {
                navigation.navigate('CategoryPicker', { callback: value => {
                  updateCategories(value, index + (myCategories ? myCategories.length : 0))
          } })
              }} text="Agregar"  navigation={navigation} index={index + (myCategories ? myCategories.length : 0)} />
          ))}

          {showSeeAll && (
              <LastCategoryItem 
                index={3} 
                icon={images.seeAll}
                text="Ver Todas"
                navigation={navigation}
                onPress={() => {
                  onPress({ index: 3, category: null})
                }}
              />
          )}

        </View>
      )}
    </>
  )
}

const styles = StyleSheet.create({
  container:{
    flexDirection: 'row', 
    width:'100%', 
    justifyContent:'space-between', 
    marginTop: 20
  },  
  item:{
    alignItems:'center',
  },
  itemBox:{
    borderRadius: 30,
    overflow:'hidden',
  },
  skeletonItem:{
    width: itemWidth, 
    height: itemWidth, 
    borderRadius: 8
  }
})

export default PickerCategories
