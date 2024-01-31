import React, { useState } from 'react'
import { View, TextInput, StyleSheet, Image, TouchableOpacity } from 'react-native'
import { images } from '../../assets'
import Label from '../../components/text/Label'
import colors from '../../utils/colors'
import { moneyFormat } from '../../utils/number'

const InputText = ({ 
    cancelable = false,
    onChange=()=>{},
    text='', 
    editable=true,
    height = 50, 
    autoCompleteType='off', 
    label,
    style={},
    placeholder='$0',
    isMoney=true
}) => {

    const [localText, setLocalText] = useState(text)
    const [focus, setFocus] = useState(false)

    const borderStyle =  focus ? { borderColor: colors.mainColor, borderWidth: 2}:{borderColor: '#CCC', borderWidth: 1}
    const heightStyle = (height) ? { height } : {}

    
    const CancelableButton = () => (
        <TouchableOpacity style={{marginLeft: 5}}  onPress={() => {
            onChangeText('')
        }}>
            <Image source={images.cancel_input} style={{width:16, height: 16, resizeMode:'contain', marginRight: 10}} />
        </TouchableOpacity>
    )

    return (   
        <View style={[styles.container, style]}>
           {label && <Label color={colors.mainColor} style={styles.label}>{label}</Label>}
            <View  style={[styles.input, borderStyle, heightStyle]}>
                
                <TextInput
                    style={styles.text}
                    onChangeText={text => {
                        setLocalText(isMoney ? moneyFormat(text) : text)
                        onChange(text)
                    }}
                    editable={editable}
                    value={localText}
                    placeholderTextColor="#999"
                    placeholder={placeholder}
                    keyboardType = 'numeric'
                    onFocus={() => {
                        setFocus(true)
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
    text:{
        height: '100%', 
        flex: 1, 
        paddingVertical: 0, 
        textAlignVertical:'center',
        fontSize: 16,
        fontFamily:'Poppins-bold',
        color: colors.black,
        includeFontPadding:false,
    },
    input:{
        marginTop: 5,
        height: 50, 
        paddingHorizontal: 10,
        flexDirection:'row',
        backgroundColor: colors.white,
        alignItems:'center',
        borderColor: '#CCC', 
        borderRadius: 10,
        borderWidth: 1,
        justifyContent: 'space-between',
        alignItems: 'center'
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