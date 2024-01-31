import React from 'react'
import { TouchableOpacity, Text, StyleSheet, Image, View } from 'react-native'
import colors from '../../utils/colors'

const ActionButton = ({ onPress = () => {}, backgroundColor=colors.card.green, rightIcon, text, labelStyle = {}, style={}, isDisabled = false}) => {

    return (
        <View style={[styles.container, { backgroundColor}, style, { opacity: (isDisabled)? 0.5 : 1.0}]}>
            <TouchableOpacity style={styles.button}  isDisabled={isDisabled}  onPress={() => { 
            if(!isDisabled){onPress()}
        }}>
           <Text style={[styles.label, labelStyle]}>{text.toUpperCase()}</Text>
           {rightIcon && <Image source={rightIcon} style={{width: 24, height: 24, marginLeft: 20}} resizeMode="contain" />}
        </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        borderRadius: 17,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.36,
        shadowRadius: 6.68,
        elevation: 11,
    },
    button:{
        padding: 10,
        minHeight: 50,
        flexDirection:'row',
        alignItems: 'center',
        justifyContent:'center',
    },
    label:{
        color: 'white',
        fontSize: 15,
        textAlign:'center',
        fontFamily:'Poppins-Bold',
        alignSelf: 'center',
    },
    icon:{
        alignSelf:'flex-start',
       
    }
})

export default ActionButton