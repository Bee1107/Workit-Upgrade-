import React, { useState, useEffect, useRef } from 'react'
import { View, TextInput, StyleSheet, Image, Platform, TouchableOpacity } from 'react-native'
import { images } from '../../assets'
import Label from '../../components/text/Label'
import colors from '../../utils/colors'

const InputText = ({ 
    cancelable = false,
    icon, 
    textContentType='none', 
    keyboardType='default',
    prefix,
    onChange=()=>{},
    text='', 
    editable=true,
    height = 50, 
    multiline=false, 
    numberOfLines=1, 
    placeholder, 
    autoCompleteType='off', 
    secureTextEntry = false,
    label,
    style={},
    onFocus= () => {},
    alignText='center'
}) => {


    const [focus, setFocus] = useState(false)
    const input = useRef(null)

    const borderStyle =  focus ? { borderColor: colors.mainColor, borderWidth: 2}:{borderColor: '#CCC', borderWidth: 1}
    const heightStyle = (height) ? { height } : {}

    useEffect(() => {
        if (input) {
            input.current.setNativeProps({
                style: { fontFamily: 'Poppins-Regular' }
            })
        }
    }, [])
    
    const CancelableButton = () => (
        <TouchableOpacity 
            style={{marginLeft: 5}}  
            onPress={() => {
                onChangeText('')
            }}>
            <Image source={images.cancel_input} style={{width:16, height: 16, resizeMode:'contain', marginRight: 10}} />
        </TouchableOpacity>
    )

    return (   
        <View style={[styles.container, style]}>
           {label && <Label color={colors.mainColor} style={styles.label}>{label}</Label>}
            <View  style={[styles.input, borderStyle, heightStyle]}>
                
                {icon && <Image source={icon} style={{width:16, height: 16, resizeMode:'contain', marginRight: 10, alignSelf: (height === 50) ? 'auto' : 'flex-start', marginTop: (height == 50) ? 0 : 10}} />}
                {prefix && <Label color={colors.black} style={{marginRight: 5}}>{prefix}</Label>}
                <TextInput
                    ref={input}
                    style={[styles.textInput, { textAlignVertical: alignText}]}
                    onChangeText={text => {
                        onChange(text)
                    }}
                    multiline={multiline}
                    editable={editable}
                    value={text}
                    placeholderTextColor="#999"
                    placeholder={placeholder}
                    textContentType={textContentType}
                    numberOfLines={numberOfLines}
                    keyboardType={keyboardType}
                    secureTextEntry={secureTextEntry}
                    onFocus={() => {
                        setFocus(true)
                        onFocus()
                    }}
                    onBlur={() => {
                        setFocus(false) 
                    }}
                    autoCompleteType={autoCompleteType}
                    />
                {cancelable && text.length > 0 && <CancelableButton />}
            </View>
            
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 5,
    },
    input:{
        height: 50, 
        paddingHorizontal: 10,
        flexDirection:'row',
        backgroundColor: colors.white,
        alignItems:'center',
        borderColor: '#CCC', 
        borderRadius: 10,
        borderWidth: 2,
        paddingVertical: 10
    },
    textInput:{
        color: colors.black, 
        height: '100%', 
        flex: 1, 
        paddingVertical: 0, 
        fontFamily:'Poppins-Regular',
        marginTop: Platform.OS === 'ios' ? 0 : 5,
    },
    label:{
        position:'absolute',
        left: 20,
        backgroundColor: colors.white,
        zIndex: 9999,
        paddingHorizontal: 5
    }
})

export default InputText