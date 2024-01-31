import React, { useState, useEffect } from 'react'
import { View, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { images } from '../../assets'
import Label from '../../components/text/Label'
import AsyncStorage from '@react-native-async-storage/async-storage'
import colors from '../../utils/colors'
import BigSearchInput from '../../components/BigSearchInput'

const SearchAddressScreen = ({ addresses, select }) => {

   
    const navigation = useNavigation()
    const [addressSelected, setAddressSelected] = useState()

    useEffect(() => {
        AsyncStorage.getItem('@selectedAddress').then(
            response => {
                const { uid } = JSON.parse(response)
                setAddressSelected(uid)
            }
        )
    }, [])

    const renderItem = ({ item }) => {

       return (
        <View key={`key_${item.uid}`}  style={{backgroundColor:colors.white}}>
            <TouchableOpacity onPress={() => {
                select({ uid: item.uid })
                navigation.goBack()
            }}>
            <View style={{backgroundColor: colors.white, padding: 10, flexDirection:'row', alignItems:'center', borderBottomColor:'#CCC', borderBottomWidth: StyleSheet.hairlineWidth}}>
                <Image source={images.mini_pin} style={{width: 20, height:20, resizeMode:'contain', tintColor: colors.mainColor}} />
                <View style={{ flex: 1, marginLeft: 10}}>
                    <Label color={colors.text.title} fontSize={16}>{`${item.street} ${item.housenumber}`}</Label>
                    <Label color={colors.text.subtitle}>{`${item.district}`}</Label>
                </View>
                {addressSelected === item.uid && <Image source={images.circleCheck} style={{width: 22, height: 22 }} />}
                </View>
            </TouchableOpacity>
                
        </View>
       )
}

    return (   
        <View style={styles.container}>

                <View style={{padding: 10}}>
                    <BigSearchInput 
                        editable={false}
                        placeHolder="Ingresa una nueva dirección"
                        onPress={() => {
                            navigation.navigate('SearchAddress')
                        }} 
                    />

                </View>
                
                {addresses && <FlatList
                    data={addresses}
                    renderItem={renderItem}
                    keyExtractor={({ uid }) => uid }
                />}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white,
        justifyContent:'space-between'
    },
    spinnerTextStyle: {
        color: '#FFF'
    },
})

export default SearchAddressScreen