import React, { useEffect } from 'react'
import { View, StyleSheet, TouchableOpacity, ImageBackground, Image, Text } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import Label from '../../../components/text/Label'
import ActionButton from '../../../components/ActionButton'

import EmptyImageVIew from '../../../components/EmptyImageVIew'
import { SwipeListView } from 'react-native-swipe-list-view'
import colors from '../../../utils/colors'
import { images } from '../../../assets'
import { moneyFormat } from '../../../utils/number'

import { CachedImage } from 'react-native-img-cache'
const RepairStepOneScreen = ( { get, services, deleteAction }) =>{ 

    const navigation = useNavigation()
  
    useEffect(() => {
        get()
    }, [])


    const removeItem = data => deleteAction(data) 

    const goToPostService = () => navigation.navigate('PostService')

    const renderItem = ({ item }) => (
        <View key={`key_${item.id}`} style={{backgroundColor: colors.white}}>
            <TouchableOpacity onPress={() => {
               
               
            }}>
               <View style={{backgroundColor:colors.white, padding: 10, flexDirection:'row', alignItems:'center', borderBottomColor:'#CCC', borderBottomWidth: StyleSheet.hairlineWidth}}>

                   <View style={{width: 60, height: 60,borderRadius: 10, overflow: 'hidden'}}>
                       <ImageBackground
                           source={images.coverImage}
                           style={{width: 60, height: 60}}
                           resizeMethod="scale">
                            {(item.image !== undefined && item.image !== '') && <CachedImage  source={{uri: item.image}} style={{width: 60, height:60 }} resizeMode="cover" />}
                       </ImageBackground>
                   </View>
                    
                   <View style={{ flex: 1, marginLeft: 10}}>
                       <Label color={colors.text.title} fontSize={16}>{item.name}</Label>
                       <View style={{flexDirection: 'row', marginTop: 5}}>
                            <Label>{moneyFormat(item.amount)}</Label>
                            <Label fontSize={12}>{` por ${item.measure}`}</Label>
                        </View>
                       
                   </View>
               </View>
            </TouchableOpacity> 
        </View>
    )

    return (
        <View style={styles.container}>
           
            {(services === undefined ||services.length == 0) && (
               <View style={{flex: 1, padding: 20}}>
                    <EmptyImageVIew 
                    message="No tienes servicios publicados"
                    image={images.volumenIcon.emptyService} 
                    onPress={goToPostService}
                    buttonTitle="Agregar un nuevo servicio"
                     />
                </View>
            )}
            {services !== undefined && services.length > 0 && (
                <>

                <SwipeListView
                data={services}
                keyExtractor={({ id }) => `${id}` }
                renderItem={renderItem}
                renderHiddenItem={ data => (
                    <TouchableOpacity onPress={() => removeItem(data.item)} >
                        <View style={{backgroundColor:'#FF2625', width:100, height: 80, alignItems:'center', justifyContent:'center', alignSelf:'flex-end'}}>
                            <Label color="white">Eliminar</Label>
                        </View>
                    </TouchableOpacity>
                )}
               
                rightOpenValue={-100}
            />

                <ActionButton
                    text="Agregar un nuevo servicio"
                    style={styles.button}
                    onPress={goToPostService}
                    />
                </>
            )}
    </View>
    )
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