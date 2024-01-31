import React, { useState, useEffect } from 'react'
import { View, StyleSheet, FlatList, TouchableWithoutFeedback, Image, TouchableOpacity, Keyboard } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import SemiHeading from '../../components/text/SemiHeading'
import Label from '../../components/text/Label'
import BigSearchInput from '../../components/BigSearchInput'
import { SafeAreaView } from 'react-native-safe-area-context'
import { images } from '../../assets'
import colors from '../../utils/colors'

const SearchAddressScreen = ({ get, address, select }) => {

    const navigation = useNavigation()

    const [search, setSearch] = useState('')

    useEffect(() => {
        get({ search })
    }, [search])

    const renderItem = ({ item, index }) => (
        <TouchableOpacity key={`key_${index}`} style={styles.item} onPress={()=>{
            select(item)
            navigation.navigate('AddAddress', { item })
        }}>
            <View>
                <Label fontSize={14} color={colors.text.title}>{item.description.split(',')[0]}</Label>
                <Label fontSize={12} color={colors.text.subtitle}>{item.structured_formatting.secondary_text}</Label>
            </View>
          
        </TouchableOpacity>
    )

    return (   
        <TouchableWithoutFeedback onPress={() => {
            Keyboard.dismiss()
        }}>
            <View style={styles.container} >
                <View style={styles.header}>
                <BigSearchInput
                    editable={true}
                    placeHolder="Ingresa tu dirección"
                    onChange={setSearch}
                    />
                   
                </View>
                {address.length === 0 && (
                    <SafeAreaView edges={['right', 'bottom', 'left']} style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                        <Image source={images.volumenIcon.pin} style={{width: 100, height: 100}} resizeMode="contain" />
                        <SemiHeading style={{marginTop: 10}}>Buscar Direcciones</SemiHeading>
                    </SafeAreaView>
                )}
                
                {address.length > 0 && <FlatList
                    data={address}
                    renderItem={renderItem}
                    keyExtractor={({place_id}) => place_id}
                />}
            </View>
        </TouchableWithoutFeedback>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white,
        justifyContent:'space-between'
    },
    header:{
        padding: 10, 
        flexDirection:'row', 
        alignItems:'center',
        borderBottomColor:'#CCC',
        borderBottomWidth: StyleSheet.hairlineWidth
    },
    spinnerTextStyle: {
        color: '#FFF'
    },
    button1:{
        backgroundColor:'#000', 
        borderRadius: 6, 
        marginTop: 20, 
        marginHorizontal: 10
    },
    button2:{
        fontSize: 14, 
        color:'#999'
    },
    item:{
        padding: 10,
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: '#F5F5F5'
    }
})

export default SearchAddressScreen