import React, { useEffect, useState } from 'react'
import { View, StyleSheet, TouchableOpacity, Image, Text } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { images } from '../../../assets'
import Label from '../../../components/text/Label'
import ActionButton from '../../../components/ActionButton'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { SwipeListView } from 'react-native-swipe-list-view'
import colors from '../../../utils/colors'
import EmptyImageView from '../../../components/EmptyImageVIew'




const RepairStepOneScreen = ( { address, select, deleteAddress }) =>{ 

    const navigation = useNavigation()
    const [addressSelected, setAddressSelected] = useState()
  
   
    useEffect(() => {
        AsyncStorage.getItem('@selectedAddress').then(
            response => {
                const { uid } = JSON.parse(response)
                setAddressSelected(uid)
            }
        ).catch(() => {})
    }, [])


    const removeItem = (index) => {
        deleteAddress({ index }) 
    }


    const renderItem = ({ item }) => {

        return (
         <View key={`key_${item.uid}`}  style={{backgroundColor: colors.white}}>
             <TouchableOpacity onPress={() => {
                 select({ uid: item.uid })
                 setAddressSelected(item.uid)
                 AsyncStorage.setItem('@selectedAddress', JSON.stringify({ uid: item.uid})).then(() => {
                    
                 })
                
             }}>
             <View style={{backgroundColor: colors.white, padding: 10, flexDirection:'row', alignItems:'center', borderBottomColor:'#CCC', borderBottomWidth: StyleSheet.hairlineWidth}}>
                 <Image source={images.mini_pin} style={{width: 20, height:20, resizeMode:'contain'}} />
                 <View style={{ flex: 1, marginLeft: 10}}>
                     <Label color={colors.text.title} fontSize={16}>{`${item.street} ${item.housenumber}`}</Label>
                     {item.district && item.district !== null && <Label color={colors.text.subtitle}>{`${item.district}`}</Label>}
                 </View>
                 {addressSelected === item.uid && <Image source={images.ticket} style={{width: 15, height: 15 }} />}
                 </View>
             </TouchableOpacity>
                 
         </View>
        )
 }

    return <View style={styles.container}>
           
            {(address === undefined || address.length == 0) && (
                <EmptyImageView onPress={() => {
                    navigation.navigate('AddAddressRoot')
                    
                }}
                buttonTitle="Agregar Dirección"
                image={images.volumenIcon.pin}
                message="No has agregado ninguna dirección"
                style={{padding: 20}}
                />
            )}
            {address !== undefined && address.length > 0 && (
                <>

                <SwipeListView
                data={address}
                keyExtractor={({ uid }) => `${uid}` }
                renderItem={renderItem}
                renderHiddenItem={ data => (
                    <TouchableOpacity onPress={() => removeItem(data.index)}>
                        <View style={{backgroundColor:'#FF2625', width:100, height:60, alignItems:'center', justifyContent:'center', alignSelf:'flex-end'}}>
                            <Label color="white">Eliminar</Label>
                        </View>
                    </TouchableOpacity>
                )}
               
                rightOpenValue={-100}
            />

            
                <ActionButton
                text="Agregar una nueva dirección"
                style={styles.button}
                onPress={() => {
                    navigation.navigate('AddAddressRoot', { screen: 'SearchAddress' })
                 
                }}
                />
                </>
            )}
    </View>
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor: colors.white
    },
    header: {
        flexDirection:'row',
        justifyContent:'space-between',
        paddingHorizontal: 10
    },
    option: {
        paddingTop: 50
    },

    lottie:{
        width: 300,
        height: 300,
        alignSelf:'center'
    },
    button:{
        marginHorizontal: 20,
        marginBottom: 20,
        marginTop:20
    }
})


export default RepairStepOneScreen