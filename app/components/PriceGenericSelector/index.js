
import React, { useState, useRef, useEffect, } from 'react'
import { View, StyleSheet, Animated, Easing } from 'react-native'
import Slider from '@react-native-community/slider'
import colors from '../../utils/colors'
import Label from '../../components/text/Label'
import SemiHeading from '../../components/text/SemiHeading'
import { moneyFormat } from '../../utils/number'

const ItemPrice = ({ price, isOpen, }) => {

    const progress = useRef(new Animated.Value(4)).current
    const [duration, setDuration] = useState(0)

    useEffect(() =>{
        Animated.timing(progress, {
            toValue: isOpen ? 1 : 0,
            duration,
            useNativeDriver: false,
            easing: Easing.elastic(1)
          }).start()

          if(duration === 0){
            setDuration(400)
          }

    }, [isOpen])

    const height = progress.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 20],
    })

    const top1 = progress.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 16],
    })

    const top2 = progress.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 8],
    })
      
    return (
        <View style={styles.indicatorContainer}>
            <Label fontSize={12} style={{width: 100, textAlign: 'center'}}>{price}</Label>
            <Animated.View style={[styles.circlesIndicator, { height }]}>
                <Animated.View style={[styles.circle, {top: top1}]} />
                <Animated.View style={[styles.circle, {top: top2}]} />
                <Animated.View style={styles.circle} />
            </Animated.View>
        </View>
    )
}

const PriceGenericSelector = ({ onChange, currentValue = 20000 }) => {

    const [width, setWidth] = useState(375)

    const onLayout = ({ nativeEvent: {layout} }) => {
        setWidth(layout.width)
    }

    return (
        <View style={{ flex: 1}}>
            <View style={styles.container} onLayout={onLayout}>
                <View style={[styles.bar,{width: width - 40, marginLeft: 20}]} />
                <View style={styles.labels}>
                    <ItemPrice price="$20.000" isOpen={currentValue >= 20000} />
                    <ItemPrice price="$25.000" isOpen={currentValue >= 25000} />
                    <ItemPrice price="$50.000" isOpen={currentValue >= 50000} />
                    <ItemPrice price="$75.000" isOpen={currentValue >= 75000} />
                    <ItemPrice price="+$100.000" isOpen={currentValue >= 95000} />                
                </View>
                <Slider
                    style={{width: '100%', height: 40, marginTop: -22}}
                    minimumValue={20000}
                    maximumValue={100000}
                    value={currentValue}
                    minimumTrackTintColor={colors.mainColor}
                    maximumTrackTintColor="rgba(0,0,0,0)"
                    onValueChange={value => {
                        onChange(value)
                    }}
                />
            </View>
            <View style={{alignItems: 'center', height:50, justifyContent:'center', flex: 1, paddingBottom: 10, marginTop: -40}}>
                <View style={styles.priceCapsule}>
                    {currentValue< 100000 && <SemiHeading>{`Hasta ${moneyFormat((currentValue/1000).toFixed() * 1000)}`}</SemiHeading>}
                    {currentValue >= 100000 && (
                        <SemiHeading>$100.000 o más</SemiHeading>
                    )}
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
        height: 100,
        justifyContent: 'flex-end',

    },
    bar:{
        top: 58,
        position:'absolute',
        backgroundColor: colors.winterWhite,
        height: 4,
        width: '100%'
    },
    labels:{
        flexDirection:'row',
        justifyContent: 'space-between',
        marginBottom: 6
    },
    indicatorContainer:{
        width: 6,
        alignItems: 'center',
        justifyContent: 'flex-end'
    },
    circlesIndicator:{
        width: 6,
        height: 6,
    },
    circle:{
        position:'absolute',
        width: 6,
        height: 6,
        backgroundColor: colors.mainColor,
        borderRadius: 3,
        borderColor: colors.white,

        borderWidth: 1
    },
    priceCapsule: {


        paddingVertical: 2,
        paddingHorizontal: 10
    }
})

export default PriceGenericSelector