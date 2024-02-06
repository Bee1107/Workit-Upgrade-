import React, { useState, useEffect, useRef } from 'react'
import { View, StyleSheet , Platform, ImageBackground, Switch, TouchableOpacity } from 'react-native'
import InputText from '../../../components/InputText'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import Spinner from 'react-native-loading-spinner-overlay'
import { useNavigation } from '@react-navigation/native'
import ActionButton from '../../../components/ActionButton'
import { ScrollView } from 'react-native-gesture-handler'
import AvatarPicker from '../../../components/AvatarPicker'
import { config } from './signup.config'
import { images } from '../../../assets'
import Label from '../../../components/text/Label'
import { validationFields } from '../../../utils/validation'
import ActionSheet from 'react-native-actionsheet'
import {launchCamera, launchImageLibrary} from 'react-native-image-picker'
import colors from '../../../utils/colors'

const SignupScreen = ({ signup, isLoading, push, image }) => {

    const navigation = useNavigation()

    const [form, setForm] = useState(config)
    const [isEnabled, setIsEnabled] = useState(false)
    const [isValidForm, setIsValidForm] = useState(false)

    const toggleSwitch = () => setIsEnabled(previousState => !previousState)

    useEffect(() => {
        const { isValid } = validationFields(Object.values(form))
        setIsValidForm(isValid)
    }, [form])

    const intentSignup = () => {
        
        const payload = { 
            name: form.name.value,
            father_last_name: form.father_last_name.value,
            mother_last_name: form.mother_last_name.value,
            contact_number: form.contact_number.value,
            email: form.email.value,
            password: form.password.value,
            nationality: form.nationality.value,
        }

        signup(payload)
    
    }

    const actionSheet = useRef(null)

    const pickerAvatar = () => {
        if(actionSheet !== null){
            actionSheet.current.show()
        }
    }

    const launchImagePicker = index => {
        if(index === 0){
            selectCamera()
        } else if(index === 1) {
            selectLibrary()
         
        }
    }

    const selectCamera = () => {

        const options = {
            title: '',
            customButtons: [],
            storageOptions: {
                skipBackup: true,
                path: 'images',
            },
            maxWidth: 400,
            maxHeight: 400
        }
        
        launchCamera(options, response => {
        

            if (!response.didCancel && !response.error && !response.customButton) {
                push({
                    image: response
                })
            }
        })
    }

    const selectLibrary = () => {
        const options = {
            title: '',
            customButtons: [],
            storageOptions: {
                skipBackup: true,
                path: 'images',
            },
            maxWidth: 400,
            maxHeight: 400
        }

        launchImageLibrary(options, response => {
           
            if (!response.didCancel && !response.error && !response.customButton) {
                push({
                    image: response
                })
            }
        })
    }
    
    return (   
        <KeyboardAwareScrollView
            resetScrollToCoords={{ x: 0, y: 0 }}
            contentContainerStyle={styles.container}
            extraHeight={140}
            scrollEnabled={false}>

            <ActionSheet
                ref={ actionSheet} 
                title={'Elige una opción'}
                options={['Camara', 'Rollo de fotos', 'Cancelar']}
                cancelButtonIndex={2}
                onPress={launchImagePicker}
            />

            <Spinner
                visible={isLoading}
                textContent={'Registrando...'}
                textStyle={styles.spinnerTextStyle}
                />

            <ImageBackground source={images.deco.header} style={styles.header} resizeMethod="scale">
               <View />
            </ImageBackground>
            <View style={{alignItems:'center', paddingTop: 110, paddingBottom: 20}}>
                <AvatarPicker
                     showEdit={true} 
                     url={((image) ? image["assets"][0].uri : null )} 
                     onPress={pickerAvatar} 
                     isCached={false}
                />
            </View>
            <ScrollView>
                <View style={{paddingHorizontal:20,backgroundColor: colors.white}}>
                        {Object.keys(form).map(key => (
                            <InputText
                                key={`key_${form[key].index}`}
                                prefix={form[key].prefix}
                                label={form[key].label}
                                icon={form[key].icon}
                                secureTextEntry={form[key].secureTextEntry}
                                text={form[key].value}
                                onChange={ value => {
                                    const newItem = { ...form[key], value }
                                    setForm({...form, [key]:newItem})
                                }}
                            />
                        ))}
                        <View style={styles.termsContainer}>
                             <Switch
                                trackColor={{ false: colors.gray, true: colors.mainColor }}
                                onValueChange={toggleSwitch}
                                value={isEnabled}
                            />
                            <TouchableOpacity style={styles.buttonTerms} onPress={()=>{
                                navigation.navigate('Terms')
                            }}>
                                <Label>Aceptar Términos y condiciones</Label>
                            </TouchableOpacity>
                        </View>
                        {!image && (
                            <View style={{marginVertical: 10, flexDirection: 'row', backgroundColor: colors.winterWhite, padding: 10, paddingHorizontal: 20, borderRadius: 30, justifyContent: 'center'}}>
                            <Label fontSize={12} style={{marginLeft: 10, marginRight: 10, alignSelf: 'baseline'}}>Recuerda agregar foto de perfil</Label>
                        </View>
                        )}
                        
             
                        <ActionButton 
                            text="Finalizar" 
                            onPress={intentSignup} 
                            isDisabled={(!isValidForm || !isEnabled)}
                            style={styles.button}    
                        />
                </View>
            </ScrollView>
        </KeyboardAwareScrollView>
    )
}

const styles = StyleSheet.create({
    header:{
        flex:1,
        width: '100%',
        height: 200,
        position:'absolute',
        top: -40,
    },
    container: {
        flex: 1,
        backgroundColor: colors.white,
        justifyContent:'space-between'
    },
    spinnerTextStyle: {
        color: '#FFF'
    },
    termsContainer:{
        paddingVertical: 20,
        flexDirection: 'row',
        alignItems: 'center'
    },
    buttonTerms:{
        flex: 1,
        alignItems: 'center'
    },
    button:{
        marginBottom: Platform.OS === 'ios' ? 0 : 20
    }
})

export default SignupScreen