import React, { useEffect } from 'react'
import { StyleSheet, Image , ImageBackground, TouchableOpacity, View} from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { images } from '../../assets'
import colors from '../../utils/colors'
import AddressInput from '../AddressInput'

const Header = props => {

    const navigation = useNavigation()
    const { get, badge } = props

    useEffect(() => {
        get()
    }, [])
    
    const onPress = () => navigation.navigate('Notification')

    return (
        <ImageBackground style={styles.container} source={images.deco.custom_header} >
            <AddressInput />
            <TouchableOpacity style={{alignItems:'center', marginLeft: 10, width: 40, height: 40}} onPress={onPress}>
                <View style={styles.iconContainer}>
                    <View  style={{width: 32, height: 32, alignItems: 'center'}}>
                        <Image source={ images.tab.notification.on} style={{width: 26, height: 26, tintColor:'white' }}  resizeMode="contain" />
                        {badge > 0 && (
                            <View style={styles.badge} />
                        )}
                    </View>
                </View>
            </TouchableOpacity>
        </ImageBackground>
    )
}

const styles = StyleSheet.create({
    container:{
        padding: 10, 
        height: 94,
        flexDirection:'row',
        paddingTop: 45,
        justifyContent: 'center',
        alignItems: 'center'
    },
    button:{
        flex: 1,
        flexDirection:'row',
        backgroundColor: 'white',
        borderRadius: 10,
        height: 40,
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 5,
        paddingLeft: 10,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.27,
        shadowRadius: 4.65,
        elevation: 6,
    },
    avatar: {
        width: 36, 
        height: 36,
        borderRadius: 18,
        marginLeft: 10,
        borderWidth: 2,
        borderColor: 'white',
    },
    pin:{
        width: 16,
        height: 16
    },
    arrow:{
        width: 12,
        height: 12,
        marginRight: 10
    },
    iconContainer:{

        flex: 1, 
        alignItems:'center', 
        padding: 4, 
    },
    badge:{
        width: 10,
        height: 10,
        backgroundColor: colors.badge,
        position: 'absolute',
        right: 5,
        borderRadius: 10
    }
})

export default Header

