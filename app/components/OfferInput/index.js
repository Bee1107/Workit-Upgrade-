import React, { useState } from 'react'
import { View, TextInput, StyleSheet, Image, TouchableOpacity } from 'react-native'
import { images } from '../../assets'
import Label from '../../components/text/Label'
import colors from '../../utils/colors'
import { moneyFormat } from '../../utils/number'

const ButtonRound = ({ icon, onPress, style = {} }) => {
    return (
        <TouchableOpacity onPress={onPress} style={[styles.button, style]}>
            <Image source={icon} style={{width: 20, height: 20,}} resizeMode="contain" />
        </TouchableOpacity>
    )
}

const OfferInput = ({ 
    textContentType='none', 
    prefix,
    onChange=()=>{},
    text='', 
    height = 50, 
    numberOfLines=1, 
    placeholder, 
    autoCompleteType='off', 
    secureTextEntry = false,
    label,
    style={}
}) => {

    const [localText, setLocalText] = useState(moneyFormat(text))
    const [focus, setFocus] = useState(false)

    const borderStyle =  focus ? { borderColor: colors.mainColor, borderWidth: 2}:{borderColor: '#CCC', borderWidth: 1}
    const heightStyle = (height) ? { height } : {}

    return (   
        <View style={[styles.container, style]}>
           {label && <Label color={colors.mainColor} style={styles.label}>{label}</Label>}
           <ButtonRound 
            icon={images.bidButton.minus} 
            style={{marginRight: 10}}
            onPress={()=>{
                const number = text.replace(/[^0-9.]/g, '')
                const numberInt = (number <= 1000) ?  0 : parseInt(number) - 1000

                setLocalText(moneyFormat(`${numberInt}`))
                onChange(`${numberInt}`)
            }}
            />
            <View  style={[styles.input, borderStyle, heightStyle]}>
                {prefix && <Label color="black" style={{marginRight: 5}}>{prefix}</Label>}
                <TextInput
                    style={styles.textInput}
                    onChangeText={text => {
                        setLocalText(moneyFormat(text))
                        const number = text.replace(/[^0-9.]/g, '')
                        onChange(number)
                    }}
                    value={localText}
                    placeholderTextColor="#999"
                    placeholder={placeholder}
                    textContentType={textContentType}
                    numberOfLines={numberOfLines}
                    secureTextEntry={secureTextEntry}
                    keyboardType="numeric"
                    onFocus={() => {
                        setFocus(true)
                    
                    }}
                    onBlur={() => {
                    
                        setFocus(false)
                       
                    }}
                    autoCompleteType={autoCompleteType}
                    />
                  
               
            </View>
            <ButtonRound 
                icon={images.bidButton.plus} 
                style={{marginLeft: 10}}
                onPress={()=>{
                    const number = text.replace(/[^0-9.]/g, '')
                    setLocalText(moneyFormat(`${parseInt(number) + 1000}`))
                    onChange(`${parseInt(number) + 1000}`)
                }}
                />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        padding: 5,
        justifyContent: 'center',
        alignItems: 'center'
    },
    input:{
        flex: 1,
        marginTop: 5,
        height: 50, 
       
        textAlign: 'center',
        paddingHorizontal: 10,
        flexDirection:'row',
        backgroundColor: colors.white,
        alignItems:'center',
        borderColor: '#CCC', 
        borderRadius: 10,
        borderWidth: 1,
        justifyContent: 'space-between'
    },
    textInput:{
        height: '100%', 
        flex: 1, 
        paddingVertical: 0, 
        textAlignVertical:'top',
        textAlign: 'center',
        fontSize: 20,
        fontFamily:'Poppins-Bold',
        color: colors.mainColor,
    },
    label:{
        position:'absolute',
        left: 20,
        backgroundColor:'white',
        zIndex: 9999,
        paddingHorizontal: 5
    },
    button:{
        borderRadius: 20,
        width: 40,
        height: 40,
        backgroundColor: colors.mainColor,
        shadowColor: colors.mainColor,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        justifyContent: 'center',
        alignItems: 'center'
    }
})

export default OfferInput