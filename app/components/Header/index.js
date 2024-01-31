import React from 'react'
import { View, StyleSheet, TouchableOpacity, Image , ImageBackground} from 'react-native'
import { images } from '../../assets'
import Heading from '../text/Heading'

const Header = props => {

    const { isTransparent, isSpecial, hideBackButton, title, style={} } = props

    const getIcon = () => {

        if(isSpecial){
            return images.icCloseTransparent
        }

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
                    <Image source={getIcon()} style={{width: isSpecial ? 32 : 24, height: isSpecial ? 32 : 24}} resizeMode="contain"  />
                </TouchableOpacity>
            }
           
                 <View style={{ flex:1, alignItems:'center', marginRight: hideBackButton ? 0: 40 }}>
                  <Heading fontSize={16} color="white" style={{marginTop: 34}}>{(title ? title: '').toUpperCase()}</Heading>
             </View>
       

        </Container>
    )
}

const styles = StyleSheet.create({
    container:{
        padding: 10, 
        height: 84,
        flexDirection:'row',

    }
})

export default Header

