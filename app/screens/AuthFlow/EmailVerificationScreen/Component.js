import React, { useState, useEffect } from 'react'
import { View, StyleSheet , StatusBar, SafeAreaView, Text} from 'react-native'

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import Spinner from 'react-native-loading-spinner-overlay'
import ActionButton from '../../../components/ActionButton'
import SemiHeading from '../../../components/text/SemiHeading'
import Label from '../../../components/text/Label'
import {
    CodeField,
    Cursor,
    useBlurOnFulfill,
    useClearByFocusCell,
  } from 'react-native-confirmation-code-field'
import colors from '../../../utils/colors'

const CELL_COUNT = 6

const EmailVerificationScreen = ({ isLoading, route, post, sendCode }) => {

 
    const email = route.params.user ? route.params.user.email: ''
    const phone = route.params.user ? `+56${route.params.user.contact_number}`: ''

    const [value, setValue] = useState('')
    const ref = useBlurOnFulfill({value, cellCount: CELL_COUNT })
    const [props, getCellOnLayoutHandler] = useClearByFocusCell({
      value,
      setValue,
    })

    useEffect(() => {
        post({ email, phone })
    }, [])

    useEffect(() => {
        if(value.length === 6){
         
            sendCode({ email, verification_code: value})
        }
    },[value])


    const onResend = () => {
        post({ email, phone })
    }

    return (   
        <KeyboardAwareScrollView
            resetScrollToCoords={{ x: 0, y: 0 }}
            contentContainerStyle={styles.container}
            extraHeight={140}
            scrollEnabled={false}>

           
            <SafeAreaView style={{flex: 1 }}>
                <Spinner
                    visible={isLoading}
                    textContent={'Verificando...'}
                    textStyle={styles.spinnerTextStyle}
                    />

            
                <View style={{ flex: 1, marginTop: 100, flexDirection:'column', justifyContent:'space-between' }}>
                
                <View style={styles.codeContainer}>
                    <SemiHeading color={colors.black}>Te enviaremos un correo de verificación</SemiHeading>
                    <CodeField
                            ref={ref}
                            {...props}
                            value={value}
                            onChangeText={setValue}
                            cellCount={CELL_COUNT}
                            rootStyle={styles.codeFieldRoot}
                            keyboardType="number-pad"
                            textContentType="oneTimeCode"
                            renderCell={({index, symbol, isFocused}) => (
                            <Text
                                key={index}
                                style={[styles.cell, isFocused && styles.focusCell]}
                                onLayout={getCellOnLayoutHandler(index)}>
                                {symbol || (isFocused ? <Cursor /> : null)}
                            </Text>
                            )}
                        />
                    <View style={{PaddingVertical: 20, marginTop: 20}}>
                        <Label>¿Aún no te llega el código?</Label>
                        <ActionButton 
                            text="Reenviar Código"
                            onPress={onResend}    
                            style={{marginTop: 20}}  
                        />
                    </View>
                </View>
                </View>
            </SafeAreaView>
        </KeyboardAwareScrollView>
    )
}

const styles = StyleSheet.create({
    header:{
        flex:1,
        width: '100%',
        height: 200,
        position:'absolute',
        top: 0,
    },
    container: {
        flex: 1,
        backgroundColor: colors.white,
        justifyContent:'space-between'
    },
    spinnerTextStyle: {
        color: '#FFF'
    },
    codeFieldRoot: {
        marginTop: 20
    },
    cell: {
        width: 50,
        height: 50,
        lineHeight: 48,
        backgroundColor: colors.white,
        borderRadius: 10,
        fontSize: 20,
        borderWidth: 2,
        borderColor: '#00000030',
        textAlign: 'center',
        overflow:'hidden'
    },
    focusCell: {
        borderRadius: 10,
        backgroundColor: colors.white,
        borderColor: colors.mainColor,
    },
    codeContainer:{
        paddingHorizontal: 40
    }
})

export default EmailVerificationScreen