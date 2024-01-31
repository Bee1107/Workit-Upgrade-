import React, { useRef } from 'react'
import { StyleSheet, Animated, ScrollView, Easing, KeyboardAvoidingView } from 'react-native'
import { images } from '../../assets'
import colors from '../../utils/colors'
import Header from '../../components/Header'

const WorkitScrollView = ({children, title}) => {

    const scrollViewRef = useRef()

    const backgroundOpacity = useRef(new Animated.Value(1)).current
    const animateBackground = (toValue) => {
        Animated.timing(backgroundOpacity, {
            toValue: toValue,
            duration: 100,
            useNativeDriver: false,
            easing: Easing.linear
          }).start()
    }

    const onScroll = ({nativeEvent})=>{
        animateBackground((nativeEvent.contentOffset.y > 50) ? 0 : 1)  
    }

    const headerOpacity = backgroundOpacity.interpolate({
        inputRange: [0, 1],
        outputRange: [1, 0]
    })

    return (
        <KeyboardAvoidingView
            behavior="height"
            keyboardVerticalOffset={0}
            style={styles.container}>
    
            <Animated.Image source={images.deco.header} style={[styles.header, {opacity: backgroundOpacity}]} resizeMethod="scale" />
            
            <ScrollView ref={scrollViewRef} style={{flex:1}} scrollEventThrottle={20} onScroll={onScroll}>
            {children}
            </ScrollView>

            <Animated.View style={[styles.fakeHeader, {opacity: headerOpacity}]}>
                <Header title={title} hideBackButton={true} />
            </Animated.View>
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white,
    },
    bottom:{
        padding: 20,
        backgroundColor: colors.white
    },
    pagerView:{
        height: 400,
    },
    header:{
        flex:1,
        width: '100%',
        height: 300,
        position:'absolute',
        top: -40,
    },
    fakeHeader:{
        flex: 1,
        width:'100%', 
        alignSelf:'baseline', 
        position: 'absolute', 
        top:0, 
        width: '100%'
    }
})

export default WorkitScrollView