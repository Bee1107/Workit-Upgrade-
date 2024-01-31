import React from 'react'
import { View, StyleSheet , StatusBar, Image, TouchableOpacity, Platform} from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import Spinner from 'react-native-loading-spinner-overlay'
import { useNavigation } from '@react-navigation/native'
import ButtonConnect from '../../../components/ButtonConnect'
import { images } from '../../../assets'
import Label from '../../../components/text/Label'
import SemiHeading from '../../../components/text/SemiHeading'
import Heading from '../../../components/text/Heading'
import colors from '../../../utils/colors'
import { SafeAreaView } from 'react-native-safe-area-context'
import Video from 'react-native-video';

const videoMp4 = require('../../../../assets/video.mp4')

const MainScreen = ({ isLoading, appleConnect, fbConnect, googleConnect }) => {

    const navigation = useNavigation()
   

    const goSignup = () => {
        navigation.navigate('Signup')
    }

    const goLogin = () => {
        navigation.navigate('Login')
    }

    return (   

        <>
          <Video 
            resizeMode="cover"
            source={videoMp4}                                    
            onBuffer={() => {

            }}             
            onError={() => {

            }}   
            repeat={true}  
            playWhenInactive={true}      
            style={{flex:1, position:'absolute', width: '100%', height: '100%'}} />

            <View style={{flex:1, position:'absolute', width: '100%', height: '100%', backgroundColor:'rgba(0,0,0,0.4)'}} />
        <SafeAreaView style={{ flex: 1}}>

      

        <KeyboardAwareScrollView
                    resetScrollToCoords={{ x: 0, y: 0 }}
                    contentContainerStyle={styles.container}
                    extraHeight={140}
                    scrollEnabled={false}>

          


               
                    <Spinner
                        visible={isLoading}
                        textContent={'Conectando...'}
                        textStyle={styles.spinnerTextStyle}
                        />

                    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center', flex: 1}}>
                        <View style={{flexDirection:'row', justifyContent:'center', alignItems: 'center'}}>
                        <Image source={images.splash_logo} style={{width: 80, height: 80 }} resizeMode="contain"   />
                            <Label fontSize={40} color="white"  style={{marginLeft: 10}}>WORK IT </Label>
                        </View>
                        <Label color="white" fontSize={16}  style={{marginTop: 40}}>Soluciones al alcance de tu mano</Label>
                    </View>

                <View style={{padding: 20, justifyContent: 'center'}}>


            
                        <View style={styles.marginTop}>
                            {Platform.OS === 'ios' && <ButtonConnect  icon={images.connect.apple} title="Iniciar sesión con apple" onPress={appleConnect} style={styles.marginTop} />} 
                            <ButtonConnect icon={images.connect.email} isTransparent={true} title="Iniciar sesión con Correo" onPress={goLogin} style={styles.marginTop} />   
                        </View>  
                       
                        <View style={styles.connectBox}>
                            <Label color="white">Conectar con</Label>
                            <View style={{marginTop: 20, flexDirection: 'row'}}>
                                <TouchableOpacity onPress={fbConnect}  style={styles.circleButton}>
                                    <Image source={images.connect.facebook} style={{width: 34, height: 34}} resizeMode="contain" />
                                </TouchableOpacity>
                                <TouchableOpacity onPress={googleConnect}  style={styles.circleButton}>
                                    <Image source={images.connect.google} style={{width: 34, height: 34}} resizeMode="contain" />
                                </TouchableOpacity>
                            </View>
                        </View>

                    </View>

                    <View style={styles.bottom}>
                        <Label color="white" fontSize={15}>¿No tienes cuenta?</Label>
                        <TouchableOpacity onPress={goSignup} style={styles.marginTop}>
                            <SemiHeading color={colors.mainColor}>CREAR CUENTA</SemiHeading>
                        </TouchableOpacity>
                    </View>
                
                </KeyboardAwareScrollView>

               
        </SafeAreaView>
       </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent:'space-between'
    },
    spinnerTextStyle: {
        color: '#FFF'
    },
    marginTop:{
        marginTop: 10
    },
    bottom:{
        padding: 20, 
        alignItems:'center',
    },
    connectBox:{
        alignItems: 'center',
        marginTop: 10,
        borderColor: colors.winterWhite,
        borderWidth: StyleSheet.hairlineWidth,
        borderRadius: 10,
        padding: 10
    },
    circleButton:{
        backgroundColor: colors.white,
        borderRadius: 50,
        padding: 10,
        marginHorizontal: 10
    }
})

export default MainScreen