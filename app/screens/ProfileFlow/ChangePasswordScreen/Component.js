import React, { useState, } from 'react'
import { View, StyleSheet , StatusBar, SafeAreaView} from 'react-native'
import InputText from '../../../components/InputText'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import Spinner from 'react-native-loading-spinner-overlay'
import ActionButton from '../../../components/ActionButton'
import { images } from '../../../assets'
import colors from '../../../utils/colors'

const ChangePasswordScreen = ({ isLoading, post }) => {

    const [currentPassword, setCurrentPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [reNewPassword, setReNewPassword] = useState('')

    const isDisabled = () => {
        if(currentPassword.length < 6 || newPassword.length < 6 || reNewPassword.length < 6){
            return true
        } else if(newPassword !== reNewPassword){
            return true
        }

        return false
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
                    textContent={'Enviando correo...'}
                    textStyle={styles.spinnerTextStyle}
                />

                <View style={{ flex: 1, flexDirection:'column', justifyContent:'space-between' }}>

                    <View style={{ padding: 20 }}>
                        <InputText
                            icon={images.signup.lock}
                            label="Contraseña Antigua"
                            placeholder="Ingresa tu contraseña antigua"
                            onChange={setCurrentPassword}
                            text={currentPassword}
                            secureTextEntry={true}
                            style={{marginTop: 20}}
                        />
                        <InputText
                            icon={images.signup.lock}
                            label="Contraseña Nueva"
                            placeholder="Escribe tu nueva contraseña"
                            onChange={setNewPassword}
                            text={newPassword}
                            secureTextEntry={true}
                            style={{marginTop: 20}}
                        />
                        <InputText
                            icon={images.signup.lock}
                            label="Contraseña Nueva"
                            placeholder="Reescribe tu nueva contraseña"
                            onChange={setReNewPassword}
                            text={reNewPassword}
                            secureTextEntry={true}
                            style={{marginTop: 20}}
                        />

                      
                      
                    </View>
                    <View style={{padding: 20, alignItems:'center', justifyContent: 'center', backgroundColor:'rgba(0,0,0,0)'}}>
                    <ActionButton 
                        text="Continuar"
                        isDisabled={isDisabled()}
                        style={{width: '100%'}}
                        onPress={() => { 
                            
                        }} 
                    />
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
    button1:{
        backgroundColor:'#000', 
        borderRadius: 6, 
        marginTop: 20, 
        marginHorizontal: 10
    },
    button2:{
        fontSize: 14, 
        color:'#999'
    }
})

export default ChangePasswordScreen