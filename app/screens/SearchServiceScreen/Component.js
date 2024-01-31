import React from 'react'
import { View, SectionList, StyleSheet, Image, Dimensions, TouchableOpacity } from 'react-native'
import Label from '../../components/text/Label'
import SemiHeading from '../../components/text/SemiHeading'
import AvatarPicker from '../../components/AvatarPicker'
import colors from '../../utils/colors'
import { moneyFormat } from '../../utils/number'
import BigSearchInput from '../../components/BigSearchInput'
import { useNavigation } from '@react-navigation/native'
import RadialGradient from 'react-native-radial-gradient'
import { shadeColor } from '../../utils/String'
import Ranking from '../../components/Ranking'
import { getRating } from '../../utils/number'
const windowWidth = Dimensions.get('window').width


const ItemService = ({ item, onPress }) => {
    return (
        <TouchableOpacity style={styles.itemService} onPress={() => {
            onPress(item)
        }}>
        <View style={{flexDirection: 'row'}}>
        <RadialGradient
             colors={[shadeColor(item.category.color1, 20), item.category.color1]}
             stops={[0.5]}
             center={[20,20]}
             radius={20 }
             style={styles.itemBox} >
             <Image source={{uri: item.category.image}} style={{width: 30, height: 30}} resizeMode="contain" />  
             
         </RadialGradient>
         <View style={{marginLeft: 10}}>
             <Label color={colors.text.title}>{item.name}</Label>
             <Label color={colors.text.subtitle}>{`${moneyFormat(item.amount)} ${item.measure}`}</Label>
         </View>
        </View>
     </TouchableOpacity>
    )
}

const ItemWorker = ({ item, onPress }) => {
    return (
        <TouchableOpacity style={styles.itemService} onPress={() => {
            onPress(item)
        }}>
        <View style={{flexDirection: 'row'}}>
        
         <View style={{flexDirection: 'row', alignItems:'center'}}>
             <View style={{width: 40, height: 40, justifyContent: 'center', alignItems: 'center'}}>
                <AvatarPicker sizeType="tiny" url={item.profile_picture} />
             </View>
             <View style={{ paddingLeft: 10}}>
               <Label color={colors.text.title}>{`${item.name} ${item.father_last_name}`}</Label>
               <Ranking rank={getRating(item)}  />
             </View>
         </View>
        </View>
        
     </TouchableOpacity>
    )
}

const PrincpalServicesScreen = ({  list, search, selectUser }) => {

    const navigation = useNavigation()


    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <BigSearchInput
                 editable={true}
                 placeHolder="Buscar Servicios o Workers"
                 onChange={text => {
                    
                    search({ text })
                 }}
                />
            </View>
                    
          
            <SectionList
      sections={[
         {
            title: 'Servicios',
            data: list.filter(({type}) => type === 'service')
          },
          {
            title: 'Workers',
            data: list.filter(({type}) => type === 'worker')
          },
      ].filter(({data})=>data.length > 0)}
      keyExtractor={(item, index) => item + index}
      renderItem={({ item }) => {
          return (
            <>
            {item.type==='service' && <ItemService item={item} onPress={item => {
                navigation.navigate('ServiceDetail', { item } )
            }} />}
            {item.type==='worker' && <ItemWorker item={item} onPress={worker => {
                    selectUser(worker)
                 navigation.navigate('WorkerProfile', { screen:'WorkerProfile', params: {  worker }})
            }} />}
            </>
          )
      }}
      renderSectionHeader={({ section: { title } }) => (
        <View style={{backgroundColor: colors.white, padding: 20}}>
            <SemiHeading color={colors.text.title}>{title}</SemiHeading>
        </View>
      )}
    />

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white
    },
    avatar:{
        position: 'absolute',
        top: 90,
        left: windowWidth / 4 - 40
    },
    itemContent:{
        alignItems: 'center',
        paddingTop: 40,
        paddingBottom: 10
    },
    capsule: {
        backgroundColor: colors.winterWhite,
        borderRadius: 10,
        padding: 5,
        marginTop: 10
    },
    header:{
        padding: 10,
    },
    pagerView:{
        height: 240,
    },
    itemService:{
        flexDirection:'row',
        justifyContent:'space-between',
        padding: 10,
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: colors.grayLigth
    },
    itemBox:{
        width: 40,
        height: 40,
        padding: 20,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        overflow:'hidden',
     
    }
})

export default PrincpalServicesScreen