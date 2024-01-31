import React, { useState, useEffect, useRef } from 'react'
import { View, StyleSheet, Animated, Image, Platform} from 'react-native'
import { images } from '../../../assets'
import SemiHeading from '../../../components/text/SemiHeading'
import colors from '../../../utils/colors'

const steps = ['¿Qué tienes en mente?','Fotos de referencia', 'Fecha y Precio']

const Step = ({ icon, step, index }) => {
    return (
       <View style={{width: 80, alignItems: 'center'}}>
            
            <View style={[styles.step, { borderWidth: step === index ? 0 : 1, backgroundColor: (step > index) ? 'transparent' : colors.white , borderColor: (step >= index) ? 'transparent' : colors.grayLigth }]}>
                {( step === index ) && (
                    <View style={{position:'absolute', width: 54, height: 54, borderColor: colors.wizardGreen, borderWidth: 2, borderRadius: 26}} />
                )}
                {( step <= index ) && <Image source={icon} style={{width: 35, height: 35 }} resizeMode="contain" />}
                {( step > index ) && <Image source={images.stepCheck} style={{width: 20, height: 20 }} resizeMode="contain" />}
            </View>
       </View>
    )
}

const Wizard = ({ step =0 }) => {


    const [width, setWidth] = useState(100)

    const marginBottom = useRef(new Animated.Value(-450)).current 

    useEffect(() => {
        Animated.timing(
            marginBottom,
            {
                delay: 200,
                toValue: 0,
                duration: 500,
                useNativeDriver: false
            }
        ).start()
    }, [marginBottom])

    const onLayout = ({nativeEvent}) => {
        setWidth(nativeEvent.layout.width)
    }

    return (   
        <>
        <View style={styles.steps} >
            <View style={styles.container} onLayout={onLayout}>
                <View style={[styles.stepLine,{width: width - 100}]}>
                    <View style={[styles.bar, {width:`${step/2 * 100}%`}]} />
                </View>    
                <Step step={step} index={0} icon={images.steps.idea}  />
                <Step step={step} index={1} icon={images.steps.photo}  />
                <Step step={step} index={2} icon={images.steps.agreement} />
            </View>
        </View>
        <View style={styles.capsule}>
            <SemiHeading>{steps[step]}</SemiHeading>
        </View>
        </>
    )
}

const styles = StyleSheet.create({
    container:{
        flexDirection: 'row', 
        justifyContent: 'space-between',
        paddingVertical: 20,
        marginHorizontal: 20,
    },
    steps:{
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: '#CCC',
        paddingBottom: 10,
        marginBottom: 30
    },
    step:{
        backgroundColor:'white',
        width: 50,
        height: 50,
        borderRadius: 25,
        borderWidth: 2,
        justifyContent: 'center',
        alignItems: 'center',
        
    },
    stepLine:{
        height: 2,
        width: '100%',
        position: 'absolute',
        top: 44,
        left: 50,
        backgroundColor: 'gray',
        zIndex: 0,
    },
    lottie:{
        width: 60,
        height: 60,
        top: (Platform.OS === 'ios') ? 3 : 10,
        position: 'absolute',
        transform: [{ scale: 1.8 }]
    },
    bar:{
        backgroundColor: colors.wizardGreen,
        height: 2,
    },
    capsule:{
        position:'absolute',
        padding: 10,
        backgroundColor: colors.white,
        borderRadius: 30,
        alignSelf: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.29,
        shadowRadius: 4.65,
        elevation: 7,
        top: 80,
    }
})

export default Wizard