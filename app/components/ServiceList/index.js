import React from 'react'
import { StyleSheet, FlatList , View, TouchableOpacity, Image, ImageBackground} from 'react-native'
import Label from '../../components/text/Label'
import SemiHeading from '../../components/text/SemiHeading'
import Card from '../../components/card'
import { moneyFormat } from '../../utils/number'
import { images } from '../../assets'
import { useNavigation } from '@react-navigation/native'

import { CachedImage } from 'react-native-img-cache'

const Item = ({item, onPress, index}) => (
<TouchableOpacity onPress={() => {
    onPress(item)
        }} style={{width: 160, marginLeft: index === 0 ? 0 : 10, marginRight: 10, padding: 10, alignItems: 'center'}}>
            <Card padding={0} style={{height:100}}>
            <View style={{width: 160, borderRadius: 10, overflow: 'hidden'}}>
                <ImageBackground
                        source={images.coverImage}
                        style={styles.header}
                        resizeMethod="scale">
                        {item.image !== '' && (
                            <CachedImage 
                     
                                source={{uri: item.image}} 
                                style={{width: 160, height: 100, borderRadius: 10}} 
                                resizeMode="cover"
                                mutable
                                />
                        )}
                </ImageBackground>
            </View>
            </Card>
            <SemiHeading  style={{marginTop: 10}}>{item.name}</SemiHeading>
            <View style={{flexDirection: 'row', marginTop: 5, justifyContent:'center'}}>
                <Label>{moneyFormat(item.amount)}</Label>
                <Label fontSize={12}>{` por ${item.measure}`}</Label>
            </View>
        </TouchableOpacity>
)


const ServiceList = ({ services }) => {

    const navigation = useNavigation()


    return (   
        <FlatList
            data={services}
            pagingEnabled={true}
            horizontal={true}
            renderItem={({ item, index }) => (<Item item={item} index={index} onPress={item =>  navigation.navigate('ServiceDetail', { item } )} />) }
            style={{flex: 1, width:'100%'}}
        />
    )
}

const styles = StyleSheet.create({
  
    container: {
        flex: 1,
    },
    scrollContent: {
        flex: 1,
    },
    header: {
        width: 160,
        height: 100,
    },
    headerContainer:{
        paddingHorizontal: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    containerContent: {flex: 1, marginTop: 40},
    containerHeader: {
      flex: 1,
      alignContent: 'center',
      alignItems: 'center',
      justifyContent: 'center',
      height: 60,
      marginTop: 200,
    },
    capsule:{
        width: 30,
        height: 6,
        borderRadius: 3,
        backgroundColor: 'white',
    },
    headerContent:{
      marginTop: 0,
    },
    Modal: {
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        backgroundColor: 'white',
        marginTop: 240,
    }
   
})

export default ServiceList