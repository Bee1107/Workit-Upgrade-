import React, { useEffect, useState } from 'react'
import { View, StyleSheet, TouchableOpacity, Image } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { images } from '../../assets'
import Label from '../text/Label'
import colors from '../../utils/colors'

const notHaveAddress = 'No tienes seleccionada una dirección'

const Header = props => {

    const navigation = useNavigation()
    const { user, selectedAddress } = props
    const [title, setTitle] = useState(notHaveAddress)

    useEffect(() => {
        
        if(user.addresses && selectedAddress){
            const address = user.addresses.find(({uid}) => {
                return uid === selectedAddress.uid
            })

            if(address){
                setTitle(`${address.street} ${address.housenumber}`)
            } else {
                setTitle(notHaveAddress)
            }
        } else {
            setTitle(notHaveAddress)
        }


    }, [selectedAddress, user])
    

    return (
       
        <TouchableOpacity style={styles.button} onPress={() => {
            navigation.navigate('SelectAddress')
        }}>
            <View style={{flexDirection: 'row', flex: 1, overflow: 'hidden', marginRight: 10}}>
                <Image source={images.pin.gradient} style={styles.pin} resizeMode="contain" />
                <Label fontSize={12} color={colors.black} style={{marginLeft: 10}}>{title}</Label>
            </View>
            <Image source={images.arrowDown} style={styles.arrow} resizeMode="contain" />
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container:{
        padding: 10, 
        height: 94,
        flexDirection:'row',
        paddingTop: 45,
        justifyContent: 'center',
        alignItems: 'center'
    },
    button:{
        flex: 1,
        flexDirection:'row',
        backgroundColor: colors.white,
        borderRadius: 10,
        height: 40,
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 5,
        paddingLeft: 10,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.27,
        shadowRadius: 4.65,
        elevation: 6,
    },
    pin:{
        width: 16,
        height: 16
    },
    arrow:{
        width: 12,
        height: 12,
        marginRight: 10
    }
})

export default Header

