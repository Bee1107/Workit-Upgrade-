import React from 'react'
import { View, StyleSheet, Image, TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import Heading from '../../components/text/Heading'
import Label from '../../components/text/Label'
import { images } from '../../assets'
import Card from '../../components/card'
import Wizard from '../../components/Wizard'

const HomeScreen = ({ user, addresses, selectedAddress, subtitle }) =>{ 

    const navigation = useNavigation()
   
    const getSelectedAddress = () => {
        if(addresses){

            const filter = addresses.filter( ({ uid }) => (selectedAddress && uid === selectedAddress.uid ))
           
            if(filter.length === 0){
                return addresses[0]
            } else {
                return filter[0]
            }
        }

        return undefined
    }


    const AddressButton = () => (
        <TouchableOpacity onPress={() => {
            navigation.navigate('SelectAddress')
        }}>
             <View style={styles.addressContainer}>
                <Image source={images.pin_outline} style={{ width: 15, height: 15, resizeMode:'contain'}} />
                <Label style={{marginLeft: 4}}>{(getSelectedAddress())? `${getSelectedAddress().street} ${getSelectedAddress().housenumber}` : 'No tienes dirección'}</Label>
                <Image source={images.arrow_down} style={{ width: 6, height: 6, resizeMode:'contain', marginLeft: 5}} />
            </View>
        </TouchableOpacity>
    )

    const renderItem = ({item}) => (
        <View style={{paddingVertical: 10, paddingHorizontal: 20}}>
            <Card>
                <Wizard
                    step={1}
                    small={true}
                    color="#00BA6C"
                    steps={['Esperando', 'Cotizando', 'Pago']} />
                <View style={{marginTop: 10, flexDirection:'row', alignItems:'center'}}>
                    <View style={{width: 60, height: 60}}>
                        <Image style= {{flex:1 , width: undefined, height: undefined,  resizeMode: 'contain'}}    
                            source={{uri: item.car.car_image}}
                        />
                    </View>
                    <View style={{marginLeft: 10}}>
                        <Label color="black">{item.car.model}</Label>
                        <Label>{item.car.make}</Label>
                    </View>
                </View>
                
            </Card>
       </View>
    )


    return (
        <>
            <View style={styles.header}>
                <View>
                    <Heading>¡Hola {user.name}!</Heading>
                    <Label>{subtitle}</Label>
                </View>
                <Image source={{uri: user.avatar}} style={{width:54, height:54, borderRadius: 10}} />
            </View>
            <AddressButton />
        </>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'white',
    },
    header: {
        flexDirection:'row',
        justifyContent:'space-between',
        borderBottomColor:'#CCC',
        borderBottomWidth: StyleSheet.hairlineWidth,
        padding: 20
    },
    addressContainer:{
        flexDirection: 'row',
        borderBottomColor:'#CCC',
        borderBottomWidth: StyleSheet.hairlineWidth,
        padding: 20,
        alignItems: 'center'
    },
    lottie:{
        width: 60,
        height: 60,
        alignSelf:'center'
    },
    empty_lottie:{
        width: 300,
        height: 300,
        alignSelf:'center'   
    },
    card:{
        marginTop: 20,
        flexDirection:'row',
    }
})


export default HomeScreen