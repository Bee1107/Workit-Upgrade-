import React, { useState, } from 'react'
import { View, StyleSheet , TouchableOpacity} from 'react-native'
import InputText from '../../../components/InputText'
import SemiHeading from '../../../components/text/SemiHeading'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import Spinner from 'react-native-loading-spinner-overlay'
import ActionButton from '../../../components/ActionButton'
import { images } from '../../../assets'
import { useNavigation } from '@react-navigation/native'
import { validationFields } from '../../../utils/validation'
import { SafeAreaView } from 'react-native-safe-area-context'
import colors from '../../../utils/colors'
import Label from '../../../components/text/Label'

const LoginScreen = ({ isLoading, signin }) => {

    const navigation = useNavigation()
    const [password, setPassword] = useState('')
    const [email, setEmail] = useState('')
 
    const isFormValid = () => validationFields([
        {
            value: email,
            type: 'email'
        },
        {
            value: password,
            type: 'password'
        }
    ]).isValid

    const onSignin = () => {
        signin({
            email, 
            password
        })
    }

    const onResetPassword = () => {
        navigation.navigate('ResetPassword', { email })
    }

    return ( 
   
        
        <KeyboardAwareScrollView
            resetScrollToCoords={{ x: 0, y: 0 }}
            contentContainerStyle={styles.container}
            extraHeight={140}
            scrollEnabled={false}>

            <Spinner
                visible={isLoading}
                textContent={'ingresando...'}
                textStyle={styles.spinnerTextStyle}
            />    
            <SafeAreaView style={{flex: 1 }} edges={['right', 'bottom', 'left']}>
                

            
                <View style={{ flex: 1, flexDirection:'column', justifyContent:'space-between', }}>

                    <View style={{ padding: 20, justifyContent: 'center'}}>
                       
                        <InputText
                                placeholder="Correo"
                                text={email}
                                onChange={setEmail}
                                label="Ingresa tu correo"
                                icon={images.signup.email}
                            />
                        <InputText
                                placeholder="Contraseña"
                                text={password}
                                onChange={setPassword}
                                secureTextEntry={true} 
                                label="Ingresa tu contraseña"
                                icon={images.signup.lock}
                                style={{ marginTop: 10}}
                            />
                        <ActionButton 
                            text="Continuar" 
                            style={{marginTop: 10}} 
                            onPress={onSignin}
                            isDisabled={!isFormValid()}
                            />
                    </View>
                    <View style={{padding: 20, alignItems:'center', justifyContent: 'center', backgroundColor:'rgba(0,0,0,0)'}}>
                    <TouchableOpacity onPress={onResetPassword}>
                        <SemiHeading>¿Olvidaste tu contraseña?</SemiHeading>
                    </TouchableOpacity>
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

export default LoginScreen