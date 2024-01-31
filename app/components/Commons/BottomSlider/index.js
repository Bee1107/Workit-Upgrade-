import React from 'react'
import { View, StyleSheet, Image } from 'react-native'
import Heading from '../../../components/text/Heading'
import { images } from '../../../assets'
import colors from '../../../utils/colors'
import Slider from 'react-native-unlock-slider'
import LinearGradient from 'react-native-linear-gradient'

const BottomSlider = ({onFinish, text}) => {
    return (
        <View style={styles.container}>
            <Slider
                    childrenContainer={{}}
                    isOpacityChangeOnSlide={true}
                    onEndReached={() => {
                    onFinish()
                    }}
                    slideOverStyle={{backgroundColor: '#11998e', borderRadius: 25}}
                    containerStyle={styles.buttonSlider}
                    thumbElement={
                     
                        <LinearGradient 
                            colors={['#11998e','#38ef7d']} 
                            style={{backgroundColor: colors.mainColor, height: 50, width: 60, justifyContent: 'center', alignItems: 'center', borderBottomEndRadius: 25, borderTopEndRadius: 25}}
                            start={{ x: 0, y: 0 }} 
                            end={{ x: 1, y: 0 }} 
                            >
                            <Image source={images.arrowList} style={{width: 30, height: 30}} resizeMode="contain" />
                        </LinearGradient>
                    }
                    >
                    <Heading color={colors.mainColor}>{text}</Heading>
                </Slider>
        </View>
    )
}

const styles = StyleSheet.create({

    buttonSlider: {
        margin: 8,
        backgroundColor: colors.green.ligth,
        borderRadius: 10,
        overflow: 'hidden',
        alignItems: 'center',
        justifyContent: 'center',
        width: '90%',
        height: 50,
        borderRadius:25
    },
    container: {
        alignItems:'center', 
        paddingHorizontal: 10,
        paddingVertical: 20,
        borderTopWidth: StyleSheet.hairlineWidth,
        borderTopColor: colors.grayLigth
    },
})

export default BottomSlider