import React, { useRef, useEffect } from 'react'
import { View, StyleSheet, Animated, Easing , Image, Modal, TouchableWithoutFeedback } from 'react-native'
import Label from '../../components/text/Label'
import SemiHeading from '../../components/text/SemiHeading'
import ActionButton from '../../components/ActionButton'
import { images } from '../../assets'
import colors from '../../utils/colors'
import { SafeAreaView } from 'react-native-safe-area-context'

const RunningJobScreen = ({ visible, onAcept, onCancel }) => {

    const position = useRef(new Animated.Value(-400)).current

    useEffect(() => {
        if(visible) {
            openModal()
        }
    }, [visible])

    const openModal = () => {

        Animated.timing(position, {
            toValue: 0,
            duration: 300,
            useNativeDriver: false,
            easing: Easing.linear,
          }).start()

    }

    const onPress =  () => {

        Animated.timing(position, {
            toValue: -400,
            duration: 300,
            useNativeDriver: false,
            easing: Easing.linear
          }).start(() => {
            onAcept()
          })

    }

    const onLocalCancel = () => {
        Animated.timing(position, {
            toValue: -400,
            duration: 300,
            useNativeDriver: false,
            easing: Easing.linear
          }).start(() => {
            onCancel()
          })
    }
  
    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={visible}
            onRequestClose={() => {}}>
            <SafeAreaView style={styles.modal} edges={['right', 'bottom', 'left']}>
                <TouchableWithoutFeedback onPress={() => {
                    onLocalCancel()
                }}>
                    <View style={{flex: 1}}></View>
                </TouchableWithoutFeedback>
                <Animated.View style={{bottom: position}}>
                    <View style={styles.bottomView} >
                        <Image source={images.volumenIcon.payment} style={{width: 155, height:176, alignSelf:'flex-end' }} resizeMode="contain" />
                        <View style={{flex: 1, paddingHorizontal: 10}}>
                            <SemiHeading fontSize={18} color={colors.text.title}>Pago Único</SemiHeading>
                            <Label style={{marginTop: 10}}>Paga por esta ocasión de manera segura, por algunas de estas alternativas.</Label>
                            <ActionButton 
                                text="Pagar"
                                onPress={onPress}
                                style={{ marginTop: 20, marginBottom: 20, height: 50}}
                                />
                        </View>
                    </View>
                </Animated.View>
            </SafeAreaView> 
        </Modal>
    )
}

const styles = StyleSheet.create({
    capsule:{
        flexDirection:'row',
        position:'absolute',
        right: 10,
        top: 10,
        backgroundColor: colors.capsule.blue,
        borderRadius: 20,
        paddingVertical: 5,
        paddingHorizontal: 10,
        alignSelf: 'baseline'
    },
    modal:{
        flex: 1,
        flexDirection:'column',
        backgroundColor:'rgba(0,0,0,0.6)',
        justifyContent:'flex-end',
        padding: 10
    },
    bottomView:{
        flexDirection:'row',
        backgroundColor: colors.white,
        borderTopColor:'#CCC',
        borderTopWidth: StyleSheet.hairlineWidth,
        borderRadius: 20,
        paddingTop: 20,
    },
})

export default RunningJobScreen