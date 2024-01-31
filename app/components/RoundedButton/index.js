import React from 'react'
import { TouchableOpacity, Text, StyleSheet, View, Image } from 'react-native'

const RoundedButton = ({ onPress, text, icon, style={}}) => {

    return (
       <View style={[{width:64, flexDirection:'column', justifyContent:'center'}, style]}>
            <TouchableOpacity style={{ alignItems:'center'}} onPress={onPress}>
           <View  style={styles.container} >
                <Image source={icon} />
           </View>
          
        </TouchableOpacity>
        {text && <Text style={styles.label}>{text}</Text>}
       </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: 64,
        height:64,
        alignItems: 'center',
        justifyContent:'center',
        borderRadius: 32,
        backgroundColor:'white',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.2,
        shadowRadius: 8,
        elevation: 20,
    },
    label:{
        color:'black',
        color: '#CCC',
        fontSize: 12,
        textAlign:'center',
        fontFamily:'Poppins-Medium',
        alignSelf: 'center',
        marginTop: 10
    },
})

export default RoundedButton