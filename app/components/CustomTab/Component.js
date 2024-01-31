import React, { useEffect, useRef } from 'react'
import { View, Image, Easing, StyleSheet, TouchableOpacity, SafeAreaView, Dimensions, Animated } from 'react-native'
import colors from '../../utils/colors'
  
const windowWidth = Dimensions.get('window').width

const TabItem = ({options, onPress, badge, selected}) => {
    return (
        <TouchableOpacity style={{flex: 1, alignItems:'center', height: 50}} onPress={onPress}>
            <View style={{flex: 1, alignItems:'center', padding: 10}}>
                <View  style={{width: 24, height: 24}}>
                    <Image source={selected ? options.icon.on : options.icon.off} style={{width: 24, height: 24, tintColor: colors.mainColor}}  resizeMode="contain" />
                    {options.badge && badge > 0 && (
                        <View style={styles.badge} />
                    )}
                </View>
            </View>
        </TouchableOpacity>
      
    )
}

const CustomTab = ({state, descriptors, navigation, badge}) => {

    const position = useRef(new Animated.Value(0)).current

    useEffect(() => {
        Animated.timing(position, {
            toValue: windowWidth / 5 * state.index,
            duration: 200,
            useNativeDriver: false,
            easing: Easing.linear
          })
          .start()
    }, [state.index])

   

    return (
       
        <SafeAreaView style={styles.container}>
            <Animated.View style={[styles.bar, {left: position}]} />
            <View style={styles.icons}>
                {state.routes.map((route, index) => {
                    const { options } = descriptors[route.key]
           
                    return <TabItem selected={state.index === index} key={`tab_${index}`} options={options} badge={badge} onPress={() => {
                        const event = navigation.emit({
                            type: 'tabPress',
                            target: route.key,
                        })
                
                        navigation.navigate(route.name)
                    }} />
                })}
            </View>
          
        </SafeAreaView>
      
    )
}

const styles = StyleSheet.create({
    container:{
        backgroundColor: colors.white,
       
        borderTopWidth: StyleSheet.hairlineWidth,
        borderTopColor: colors.grayLigth
    },
    bar:{
        position: 'absolute',
        width: windowWidth / 5,
        height: 5,
        borderBottomEndRadius: 3,
        borderBottomStartRadius: 3,
        backgroundColor: colors.mainColor
    },
    icons: {
        flexDirection:'row',
        marginTop: 10
    },
    badge:{
        position: 'absolute',
        width: 14, 
        height: 14,
        backgroundColor: '#FD7B6F',
        borderRadius: 7,
        right: 0,
        borderColor: colors.white,
        borderWidth: 3,
        marginRight: -4,
        marginTop: -4
    }
})

export default CustomTab