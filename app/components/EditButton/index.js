import React from 'react'
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native'
import colors from '../../utils/colors'

const ActionButton = ({ onPress = () => {}, text='Editar', style={}, isDisabled = false}) => {

    return (
        <View style={[styles.container, style, { opacity: (isDisabled)? 0.5 : 1.0}]}>
            <TouchableOpacity style={styles.button}  isDisabled={isDisabled}  onPress={() => { 
            if(!isDisabled){onPress()}
        }}>
           <Text style={styles.label}>{text}</Text>
        </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        borderRadius: 30,
        backgroundColor: colors.mainColor,
        shadowColor: 'black',
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.15,
        shadowRadius: 3,
        elevation: 5,
    },
    button:{
        padding: 5,
        paddingHorizontal: 10,
        alignItems: 'center',
        justifyContent:'center',
    },
    label:{
        color:'black',
        color: 'white',
        fontSize: 12,
        textAlign:'center',
        fontFamily:'Poppins-Bold',
        alignSelf: 'center',
    },
    icon:{
        alignSelf:'flex-start',
       
    }
})

export default ActionButton