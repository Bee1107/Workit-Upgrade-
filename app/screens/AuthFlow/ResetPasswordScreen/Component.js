import React, { useState, } from 'react'
import { View, StyleSheet , StatusBar, SafeAreaView } from 'react-native'
import InputText from '../../../components/InputText'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import Spinner from 'react-native-loading-spinner-overlay'
import ActionButton from '../../../components/ActionButton'
import { images } from '../../../assets'
import colors from '../../../utils/colors'
import { validationFields } from '../../../utils/validation'

const ResetPasswordScreen = ({ isLoading, route, post }) => {

    const [email, setEmail] = useState('')

    const isFormValid = () => validationFields([
        {
            value: email,
            type: 'email'
        },
    ]).isValid


    return (   
        <KeyboardAwareScrollView
            resetScrollToCoords={{ x: 0, y: 0 }}
            contentContainerStyle={styles.container}
            extraHeight={140}
            scrollEnabled={false}>

          
            <SafeAreaView style={{flex: 1 }}>
                <Spinner
                    visible={isLoading}
                    textContent={'Enviando correo...'}
                    textStyle={styles.spinnerTextStyle}
                    />

   

                <View style={{ flex: 1, flexDirection:'column', justifyContent:'space-between' }}>

                    <View style={{ padding: 20, justifyContent: 'center'}}>
                       
                        <InputText
                            icon={images.signup.email}
                            placeholder="Ingresa tu correo"
                            onChange={setEmail}
                            text={email}
                        />

                      
                        <ActionButton 
                            text="Continuar" 
                            style={{marginTop: 10}} onPress={() => { 

                            post({email})
                         }}
                         isDisabled={!isFormValid()}
                         />
                    </View>
                    <View style={{padding: 20, alignItems:'center', justifyContent: 'center', backgroundColor:'rgba(0,0,0,0)'}}>
                   
                    </View>
                </View>
            </SafeAreaView>
        </KeyboardAwareScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white,
        justifyContent:'space-between'
    },
    spinnerTextStyle: {
        color: '#FFF'
    },
})

export default ResetPasswordScreen