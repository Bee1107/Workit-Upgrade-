import React, { useEffect} from 'react'
import { View, StyleSheet, FlatList, TouchableOpacity, Dimensions} from 'react-native'
import { useNavigation } from '@react-navigation/native'
import colors from '../../utils/colors'
import Label from '../../components/text/Label'
import RadialGradient from 'react-native-radial-gradient'
import { CachedImage } from 'react-native-img-cache'

const windowWidth = Dimensions.get('window').width
const radius = (windowWidth / 3 - 40) 

const Item = ({ item, onPress, style }) => (
    <TouchableOpacity onPress={onPress} style={[styles.item, style]}>
         <RadialGradient
          colors={[colors.white, colors.white]}
          stops={[0.5]}
          center={[radius / 2, radius/2]}
          radius={radius / 2}
          style={styles.itemBox} >
            <CachedImage source={{uri: item.image}} style={{width: 50, height: 50}} resizeMode="contain" />  
        
         </RadialGradient>
         <Label color={colors.text.title} fontSize={12} style={styles.title} >{item.category_name}</Label>
    </TouchableOpacity>
   
)
  
const CategoryPanel = ({ categories, onChange=()=>{}, onPress, onScroll, header, get }) => {

    const navigation = useNavigation()

    useEffect(() => {
        get()
    }, [])
   
    const renderItem = ({ item }) => (
        <Item
            item={item}
            onPress={() => {
                if(onPress){
                    onPress(item)
                } else {
                    onChange()
                    navigation.navigate('Jobs', { category: item, category_id:[]})
                }
            }}
      />
    )

     return (   
        <View style={styles.container}>
            <FlatList
                data={categories}
                numColumns={3}
                renderItem={renderItem}
                ListHeaderComponent={()=>((header)?header():null)}
                keyExtractor={({category_id}) => category_id}
                style={{flex: 1, backgroundColor:colors.white, marginTop: 10}}
                onScroll={({nativeEvent}) => {
                    if(onScroll){
                        onScroll(nativeEvent)
                    }
                }}
                
            />
        </View>
    )
}

const styles = StyleSheet.create({
   
    container: {
        flex: 1,
        backgroundColor: colors.white,
    },
    title:{
        marginTop: 5,
        alignSelf:'center',
        textAlign: 'center',
    },
    item:{
        flex: 1,
        justifyContent:'flex-start',
        paddingHorizontal: 20,
        paddingVertical: 5,
        alignItems:'center',
    },
    itemBox:{
        padding: 20,
        borderRadius: 30,
        overflow:'hidden'
    }
})

export default CategoryPanel