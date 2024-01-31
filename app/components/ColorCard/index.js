import React from 'react'
import { StyleSheet , View, Image, TouchableOpacity, Dimensions} from 'react-native'
import Label from '../text/Label'
import Heading from '../text/Heading'
import LinearGradient from 'react-native-linear-gradient'
import { shadeColor } from '../../utils/String'

const windowWidth = Dimensions.get('window').width
const LABEL_FONT_SIZE = windowWidth <= 375 ? 12 : 14

const ColorCard = ({ color, image, labelColor='white', buttonText, text, onPress, style={} }) => (
    <TouchableOpacity 
            style={[styles.card, { shadowColor:color, backgroundColor: color}, style]}
            onPress={onPress}
            >
            <LinearGradient colors={[color, color]} style={styles.gradient} >
                <Image source={image} style={[styles.iconCard, { borderBottomLeftRadius: 17 }]} />
            <View style={styles.capsuleContent}>
                <Label color={labelColor} fontSize={LABEL_FONT_SIZE} style={{marginLeft: 20}}>{text}</Label>
                
                <View style={[styles.capsule, {backgroundColor: color}]}>
                    <Heading color={labelColor} fontSize={LABEL_FONT_SIZE}>{buttonText}</Heading>
                </View>
        </View>
</LinearGradient>
        
    </TouchableOpacity>
)


const styles = StyleSheet.create({
    gradient:{
        padding: 20,width:'100%', height:'100%',
        borderRadius: 10
    },
    card:{
        borderRadius: 17,
        shadowOffset: {
            width: 0,
            height: 10,
        },
        shadowOpacity: 0.6,
        shadowRadius: 16,
        elevation: 12,
        height: 200
    },
    iconCard: {
        position: 'absolute',
        zIndex: 0,
        bottom: 0,
    },
    capsule:{
        borderRadius: 20,
        borderColor: 'white',
        borderWidth: 1,
        padding: 6,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#00CFDA'
    },
    capsuleContent:{
        flex: 1,
        justifyContent: 'space-between',
        paddingLeft: 100,
        paddingTop: 10
    }
})

export default ColorCard