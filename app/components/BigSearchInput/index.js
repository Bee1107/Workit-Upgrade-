import React from 'react'
import { TouchableOpacity, View, StyleSheet, Image, TextInput } from 'react-native'
import { images } from '../../assets'
import LinearGradient from 'react-native-linear-gradient'
import { shadeColor } from '../../utils/String'
import Label from '../../components/text/Label'
import colors from '../../utils/colors'

const BigSearchInput = ({ onPress = () => {}, text, style={}, onChange, placeHolder = 'Buscar', editable = false}) => {

    const Root = editable ?  View : TouchableOpacity

    return (
        <Root style={styles.container} onPress={onPress}>
           {editable && (
                <TextInput
                style={{color:colors.black, flex: 1, height: 30, paddingVertical: 0, fontSize: 14, textAlignVertical:'top'}}
                onChangeText={text => {
                    onChange(text)
                }}
                value={text}
                placeholderTextColor="#6A696D"
                placeholder={placeHolder}
                onFocus={() => {
                    
                }}
                onBlur={() => {
                
                }}
                />
           )}
           {!editable && (
               <Label>{placeHolder}</Label>
           )}
            <View style={styles.gradientContainer}>
                <LinearGradient colors={[colors.mainColor, shadeColor(colors.mainColor, 20)]} style={styles.gradient}  >
                    <Image source={images.magnesglass} style={{width: 18, height: 18}} />
                </LinearGradient>
            </View>
        </Root>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        padding: 5,
        flexDirection: 'row',
        backgroundColor: colors.winterWhite,
        borderRadius: 12,
        justifyContent:'space-between',
        alignItems: 'center',
        paddingLeft: 10
    },
    gradientContainer:{
        width: 48,
        height: 48,
        borderRadius: 14,
        shadowColor: colors.mainColor,
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.25,
        shadowRadius: 10,
        elevation: 5,
 
    },
    gradient:{
        width: 48, 
        height: 48, 
        overflow:'hidden', 
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',

    }
})

export default BigSearchInput