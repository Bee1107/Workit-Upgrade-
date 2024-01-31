import React from 'react'
import { View, StyleSheet, TouchableOpacity, Image , ImageBackground} from 'react-native'
import { images } from '../../assets'
import Heading from '../text/Heading'
import Label from '../text/Label'
import AvatarPicker from '../AvatarPicker'

const Header = props => {

    const { navigation, scene } = props

    const { name, profile_picture, jobName, job, isGoBack} = scene.route.params.user

    const { isTransparent, hideBackButton, style={} } = props

    const onPressDetail = () => {
        if(isGoBack){
            navigation.goBack()
        } else {
            navigation.navigate('CurrentJob',  { job })
        }
    }

 
    const getIcon = () => {
        if(props.isBlack){
            return (props.close) ? images.close.black : images.back.black
        }
        return (props.close) ? images.close.default : images.back.default
    }

    const Container = isTransparent ? View : ImageBackground

    return (
       
        <Container style={[styles.container, style]} source={images.deco.custom_header} >
            { (hideBackButton === false || hideBackButton === undefined) &&
                 <TouchableOpacity style={{ width: 32, height: 32, alignItems:'center', justifyContent:'center', marginTop: 30}} onPress={() => {
                    props.navigation.goBack()
                }}>
                    <Image source={getIcon()} style={{width: 24, height: 24}} resizeMode="contain"  />
                </TouchableOpacity>
            }
           
                 <View style={styles.userContainer}>
                    <AvatarPicker url={profile_picture} sizeType="tiny" />
                    <View style={{marginLeft: 10, height:30}} >
                        <Heading fontSize={14} color="white">{name}</Heading>
                        <Label fontSize={12} numberOfLines={1} style={{marginTop: -2}} color="white">{jobName}</Label>
                    </View>
                </View>

                <TouchableOpacity onPress={onPressDetail} style={{alignSelf:'flex-end', marginTop: -20}}>
                    <Label color="white">Ver detalle</Label>
                </TouchableOpacity>
       

        </Container>
    )
}

const styles = StyleSheet.create({
    container:{
        padding: 10, 
        height: 84,
        flexDirection:'row',
        justifyContent:'flex-start'
    },
    userContainer:{
        flex: 1,
        alignItems:'center', 
        justifyContent:'flex-start',
        flexDirection:'row',
        marginTop: 30,
        marginLeft: 10,
        marginRight: 10,
        height: 30
    }
})

export default Header

