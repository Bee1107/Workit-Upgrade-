import React, { useState, useEffect } from 'react'
import { View, TextInput, StyleSheet, Image, TouchableOpacity } from 'react-native'
import { images } from '../../assets'
// import { PropTypes } from 'deprecated-react-native-prop-types'

const RoundedInputText = props => {

    const { 
        cancelable,
        icon, 
        textContentType, 
        bigShadow, 
        onChange,
        text, 
        height, 
        multiline, 
        numberOfLines, 
        placeholder, 
        autoCompleteType,
        secureTextEntry,
    } = props

    const [value, onChangeText] = useState(text)
    const [focus, setFocus] = useState(false)

    const heightStyle = height ? { height } : {}
    const shadowStyle = bigShadow ? styles.bigShadow : {}

    useEffect(() => {
        onChangeText(text)
    }, [text])

    
    const cancelableButton = () => (
        <TouchableOpacity style={{marginLeft: 5}}  onPress={() => {
            onChangeText('')
        }}>
            <Image source={images.cancel_input} style={styles.icon} />
        </TouchableOpacity>
    )

    return (   
        <View style={styles.container}>
           
            <View  style={[styles.inputContainer, heightStyle, shadowStyle]}>
                {icon && <Image source={icon} style={styles.icon} />}
                <TextInput
                    style={styles.input}
                    onChangeText={text => {
                        onChange(text)
                        onChangeText(text)
                    }}
                    multiline={multiline}
                    value={value}
                    placeholder={placeholder}
                    placeholderTextColor="#999"
                    textContentType={textContentType}
                    numberOfLines={numberOfLines}
                    secureTextEntry={secureTextEntry}
                    onFocus={() => {
                        setFocus(true)
                    }}
                    onBlur={() => {
                        setFocus(false) 
                    }}
                    autoCompleteType={autoCompleteType}
                    />
                {cancelable && value.length > 0 && cancelableButton()}
            </View>
            
        </View>
    )
}

// RoundedInputText.propTypes = {
   
//     placeholder: PropTypes.string, 
//     cancelable: PropTypes.bool,
//     icon: PropTypes.object, 
//     textContentType: PropTypes.string, 
//     bigShadow: PropTypes.bool, 
//     onChange: PropTypes.func,
//     text: PropTypes.string, 
//     height: PropTypes.number, 
//     multiline: PropTypes.bool, 
//     numberOfLines: PropTypes.number, 
//     autoCompleteType: PropTypes.string, 
//     secureTextEntry: PropTypes.bool
// }
 
RoundedInputText.defaultProps = {
    cancelable: false,
    textContentType: 'none', 
    bigShadow:  false, 
    onChange: ()=>{},
    text: '', 
    multiline: false, 
    numberOfLines: 1, 
    autoCompleteType: 'off', 
    secureTextEntry: false
}


const styles = StyleSheet.create({
    container: {
        padding: 5,
    },
    icon:{
        width:16, 
        height: 16, 
        resizeMode:'contain', 
        marginRight: 10
    },
    inputContainer:{
        marginTop: 5,
        height: 40, 
        paddingHorizontal: 10,
        flexDirection:'row',
        backgroundColor:'#F5F6FA',
        alignItems:'center',
        borderRadius: 25,
        
    },
    input:{
        height: 50, 
        flex: 1
    },
    bigShadow:{
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.2,
        shadowRadius: 6,
        elevation: 8,
        borderWidth: 0
    },
   
})

export default RoundedInputText