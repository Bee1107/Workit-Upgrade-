import React, { useRef, useState } from 'react'
import { View, Animated, StyleSheet, Image, Text, TouchableOpacity, SafeAreaView, Dimensions } from 'react-native'
import InputText from '../../../components/InputText'
import colors from '../../../utils/colors'
import { CachedImage } from 'react-native-img-cache'

const windowWidth = Dimensions.get('window').width

const WorkerDataScreen = ({ user }) => {

    const rotate = useRef(new Animated.Value(0)).current
    const [isFront, setIsFront] = useState(true)
    const frontImage = user.id_image1
    const backImage = user.id_image2
  

    const flipDocument = () => {
        Animated.timing(rotate, {
            toValue: 0.5,
            duration: 500,
            useNativeDriver: false,
          })
          .start(() => {
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

  
    return (   
        <SafeAreaView style={styles.container}>
            <View style={{flex: 1, backgroundColor: colors.white, padding: 20}}>
               
                <Animated.View style={ {
                    transform: [
                        { rotateY: rotateTransform },
                        { scaleX: isFront? 1 : -1 }
                        ]
                    }}
                
                    >
                    
                    <TouchableOpacity style={styles.document} onPress={flipDocument}>
                        {!isFront &&  <CachedImage source={{uri: backImage}}  style={{width: windowWidth - 40, height: 366 * (windowWidth - 40) / 582, borderRadius: 20}}  />}
                        {isFront  &&  <CachedImage source={{uri: frontImage}} style={{width: windowWidth - 40, height: 366 * (windowWidth - 40) / 582, borderRadius: 20}}  />}
                    </TouchableOpacity>
                </Animated.View> 

                <InputText
                        label="Rut"
                        text={user.id_number}
                        placeholder="" 
                        style={{marginTop: 20}}
                        editable={false}
                    />
                    {user.background_document !== '' && (
                         <InputText
                         label="Documento Antecedentes"
                         text={user.background_document}
                         placeholder="" 
                         style={{marginTop: 20}}
                         editable={false}
                     />
                    )}
                   
                
            </View>

        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
   
    container: {
        flex: 1,
        backgroundColor: colors.white,
        padding: 20,
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
})

export default WorkerDataScreen