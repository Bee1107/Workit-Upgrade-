import React, { useState, useEffect, useRef } from 'react'
import { View, StyleSheet, TouchableOpacity, Animated } from 'react-native'
import colors from '../../utils/colors'
import Label from '../../components/text/Label'
import Heading from '../../components/text/Heading'

const SegmentedControl = ({ labels , onChange, type='big' }) => {

    const [width, setWidth] = useState(100)
    const [selected,setSelected] = useState(labels[0])
    const position = useRef(new Animated.Value(0)).current
    const fontSizeHeading = type === 'big' ? 16 : 12
    const fontSizeLabel = type === 'big' ? 14 : 12

    const onLayout = ({nativeEvent}) => {
        setWidth(nativeEvent.layout.width / labels.length)
    }

    useEffect(() => {
        if(labels.length > 0){
            setSelected(labels[0])
        }
    }, [labels[0]])

    const onPress = index => () => {
        Animated.timing(position, {
            toValue: index * width,
            duration: 500,
            useNativeDriver: false,
          })
          .start()
          setSelected(labels[index])
          onChange(index)
    }

    return (
       <View style={styles.content}>
            <View style={styles.container} onLayout={onLayout}>
                <Animated.View style={[styles.capsule,{width, left: position}]}>
                    <Heading fontSize={fontSizeHeading} color={colors.text.title} style={styles.label}>{selected}</Heading>
                </Animated.View>
                {labels.map((item,index) => (
                    <TouchableOpacity key={`key_${index}`} onPress={onPress(index)} style={styles.button}>
                        <Label fontSize={fontSizeLabel} style={styles.label}>{item}</Label>
                    </TouchableOpacity>
                ))}
            </View>
       </View>
    )
}

const styles = StyleSheet.create({
    content:{
        padding:20
    },
    label: {
        textAlign: 'center',
    },
    container:{
        flexDirection: 'row',
        backgroundColor: colors.winterWhite,
        borderRadius: 25,
        height: 50,
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
    },
    button:{
        flex:1,
        justifyContent: 'center',
        height: 50,
    },
    capsule:{
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
        top:0,
        left:0,
        width: 200,
        height: 50,
        borderRadius: 25,
        backgroundColor: colors.white,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 6,
        },
        shadowOpacity: 0.2,
        shadowRadius: 10,
        elevation: 20,
        zIndex: 9999
    }
})

export default SegmentedControl