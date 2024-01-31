import React, { useRef, useState, useEffect } from 'react'
import { View, Animated, StyleSheet, Image, ScrollView, TouchableOpacity, Dimensions } from 'react-native'
import Spinner from 'react-native-loading-spinner-overlay'
import { images } from '../../../assets'
import ActionButton from '../../../components/ActionButton'
import { validate } from 'rut.js'
import ml from '@react-native-firebase/ml'
import Label from '../../../components/text/Label'
import { SafeAreaView } from 'react-native-safe-area-context'
import DocumentPicker from 'react-native-document-picker'
import ActionSheetUpload from '../../../components/ActionSheetUpload'
import * as Progress from 'react-native-progress'
import colors from '../../../utils/colors'
import ImagePicker from 'react-native-image-crop-picker'
import InputText from '../../../components/InputText'
import { isPhone } from '../../../utils/validation'

const notRutDetectedMessage = 'No hemos detectado el rut, intenta elegir una mejor fotográfia'

async function processDocument(localPath, callback) {
  const processed = await ml().cloudDocumentTextRecognizerProcessImage(localPath)
  const filtered = processed.blocks.filter(block => block.text.indexOf('RUN') >= 0).map(({text})=> text)
  callback(filtered)
}

async function processBackDocument(localPath, callback) {
    const processed = await ml().cloudDocumentTextRecognizerProcessImage(localPath)
    const blockText = processed.blocks.map(block => block.text).join('')
    callback(blockText)
}

async function pickDocument(callback){
    try {
        const response = await DocumentPicker.pick({
          type: [DocumentPicker.types.pdf, DocumentPicker.types.doc, DocumentPicker.types.docx],
        })
        callback({response, error:null})
      } catch (error) {
        callback({response: null, error})
      }
      
}
  
const windowWidth = Dimensions.get('window').width

const Step1Screen = ({ isLoading, post  }) => {

    const rotate = useRef(new Animated.Value(0)).current
    const actionSheet = useRef(null)
    const [documentImage, setDocumentImage] = useState(images.worker.document.front)
    const [backgroundDocument, setBackgroundDocument] = useState()
    const [validating, setValidating] = useState(false)
    const [isFront, setIsFront] = useState(true)
    const [isValid, setIsValid] = useState(false)
    const [error, setError] = useState('')

    const [frontImage, setFrontImage] = useState()
    const [backImage, setBackImage] = useState()
    
    const [rut, setRut] = useState('')
    const [phone, setPhone] = useState('')
    const [backRut, setBackRut] = useState('')

    useEffect(() => {
        setValidating(false)
        if(rut !== '' && backRut !== ''){
            
            if(backRut.indexOf(rut.slice(0, -1))){
                setIsValid(true)
            } else {
                setError(notRutDetectedMessage)
            }
        }
    }, [rut, backRut])

    const flipDocument = () => {
        Animated.timing(rotate, {
            toValue: 0.5,
            duration: 500,
            useNativeDriver: false,
          })
          .start(() => {
            setDocumentImage(isFront ? images.worker.document.back : images.worker.document.front )
            setIsFront(!isFront)
            
            Animated.timing(rotate, {
                toValue: isFront ? 1 : 0,
                duration: 500,
                useNativeDriver: false,
              })
              .start()
          })
    }
    
    const rotateTransform = rotate.interpolate({
        inputRange: [0, 0.5, 1],
        outputRange: ['0deg', '90deg', '180deg'],
    })

    const onSubmit = () => {
        const payload = {
            backgroundDocument,
            frontImage,
            backImage,
            rut,
            phone
        }

        post(payload)
    }

    const onCamera = response => {
        if(isFront){
            if(backImage){
                setValidating(true)
            } else {
                flipDocument()
            }
            processDocument(response, data => {
                if(data.length > 0){
                    const rut = data[0].replace('RUN','').replace(/\D+/g, '')
                    if(validate(rut)){
                        setRut(rut)
                        setError('')
                    } else {
                        setError(notRutDetectedMessage)
                    }
                } else {
                    setError(notRutDetectedMessage)
                }              
            })

            setFrontImage(response)
            
        } else {
            if(frontImage){
                setValidating(true)
            } else {
                flipDocument()
            }

            processBackDocument(response, data => {
                setBackRut(data)
            })
            setBackImage(response)
       
        }
        
    }

    const onPickDocument = () => {
        pickDocument(({response, error})=>{
            if(error === null){
                setBackgroundDocument(response)
            }
        })
    }

    const nameFile =  () => backgroundDocument.uri.split('/').pop()

    const onUpload = response => {
        setTimeout(() => {
            ImagePicker.openCropper({
                path: response.uri,
                width: 1060,
                height: 668
              }).then(image => {
                 onCamera(image.path)
              })
        }, 500)
    }

    return (   
        <SafeAreaView style={styles.container} edges={['left','bottom','right']}>
             <ActionSheetUpload 
            maxWidth={1000}
            maxHeight={1000}
            innerRef={actionSheet} 
            onUpload={onUpload} />
            <ScrollView style={{flex: 1 }}>
            <View style={{flex: 1,  justifyContent: 'space-between', padding: 20,}}>
            <Spinner
                visible={isLoading}
                textContent={'Enviando'}
                textStyle={styles.spinnerTextStyle}
                />
            <View>
                <Animated.View style={ {
                    transform: [
                        { rotateY: rotateTransform },
                        { scaleX: isFront? 1 : -1 }
                        ]
                    }}>
                    
                    <TouchableOpacity style={styles.document} onPress={flipDocument}>
                        {!isFront &&  <Image source={(backImage? {uri: backImage} : documentImage)} style={{width: windowWidth - 40, height: 366 * (windowWidth - 40) / 582, borderRadius: 20}}  />}
                        {isFront  &&  <Image source={(frontImage? { uri: frontImage } : documentImage)} style={{width: windowWidth - 40, height: 366 * (windowWidth - 40) / 582, borderRadius: 20}}  />}
                    </TouchableOpacity>
                </Animated.View> 


                

                {!isValid && !validating && (
                    <ActionButton 
                        text={isFront ? 'Tomar Foto Frontal' : 'Tomar Foto Trasera'}
                        onPress={() => {
                            if(actionSheet !== null){
                                actionSheet.current.show()
                              }
                        }}
                        style={{ marginTop: 20}}
                    />
                )}

                {isValid && !validating && (
                    <View style={{flexDirection: 'row', alignItems: 'center', marginTop: 10}}>
                        <Image source={images.documentCheck}  style={{width: 32, height: 32 }} resizeMode="contain" />
                        <Label style={{marginLeft: 10}}>Documento Válido</Label>
                    </View>
                )}
                {validating && (
                     <View style={{flexDirection: 'row', alignItems: 'center', marginTop: 10}}>
                        <Progress.Bar  width={windowWidth - 40} indeterminate={true} color={colors.mainColor} />
                    </View>
                )}

                
                       


                {backgroundDocument && (
                    <ActionButton 
                        rightIcon={images.backgroundDocument}
                        text={nameFile()}
                        onPress={onPickDocument}
                        style={{ marginTop: 20}}
                    />
                )}

                {!backgroundDocument && (
                    <ActionButton 
                    text="Documento de antecedentes"
                    onPress={onPickDocument}
                    style={{ marginTop: 20}}
                />
                )}
                <Label fontSize={12} style={{marginTop: 10, alignSelf: 'center'}}>(Opcional)</Label>

                {error !== '' && (
                  <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: 20}}>
                        <Label>{error}</Label>
                    </View>
                )}

                
                
                <View style={styles.verifyContainer}>
                    <Label>Cuando subas tu documento de antecedentes, tu avatar comenzara aparecer con este ticket</Label>
                    <Image source={images.verify} style={{width: 24, height: 24, marginLeft: 20}} />
                </View>

                <InputText
                               
                               prefix="🇨🇱 +56"
                               label="Número de telefono"
                               icon={images.signup.phone}
                               text={phone}
                               style={{ marginTop: 10}}
                               onChange={ value => {
                                 setPhone(value)
                               }}
                           />

            </View>

            
        
            </View>
            </ScrollView>
            <View style={{paddingHorizontal: 20}}>
                <ActionButton 
                    text="Continuar"
                    isDisabled={!isValid && !isPhone(phone)}
                    onPress={onSubmit}
                />
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
   
    container: {
        flex: 1,
        backgroundColor: colors.white,
    },
    spinnerTextStyle: {
        color: '#FFF'
    },
    document:{
        shadowColor: '#000',
        shadowOffset: {
	        width: 0,
	        height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    verifyContainer:{
        flexDirection:'row',
        marginTop: 20,
        paddingHorizontal: 20,
        marginBottom: 20,
        justifyContent: 'center',
        alignItems: 'center',

    }
})

export default Step1Screen