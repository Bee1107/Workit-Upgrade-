import React from 'react'
import { Image, TouchableOpacity, StyleSheet, View } from 'react-native'
import { images } from '../../assets'
import Label from '../../components/text/Label'

import { CachedImage } from 'react-native-img-cache'

import colors from '../../utils/colors'

const sizeMap = {
    'normal': 100,
    'small': 60,
    'tiny': 30
}

const sizeAvatarMap = {
    'normal': 90,
    'small': 50,
    'tiny': 30
}

const paddingMap = {
    'normal': 5,
    'small': 5,
    'tiny': 0
}



const AvatarPicker = ({url, onPress, style={},isCached= true, rating=0, shadow=true, showTicket = false, showBadge = false, showEdit=false, sizeType='normal'}) => {

    const size = sizeMap[sizeType]
    const sizeAvatar = sizeAvatarMap[sizeType]
    const sizeEdit= sizeType === 'normal' ? 34 : 24
    const padding = paddingMap[sizeType]
    const shadowStyle = shadow ? styles.shadow : {}
    const Root = showEdit ? TouchableOpacity : View
 
    const onPressItem = ()=>{if(showEdit){onPress()}}



    return (
        <Root style={style} onPress={onPressItem}>
            <View style={[styles.avatarContainer, shadowStyle, {padding, width: size, height: size}]}>
                <Image source={images.avatar} style={[styles.avatar, {width: sizeAvatar, height: sizeAvatar, borderRadius: sizeAvatar / 2}]} />
                {(url !=='' && url !== null && url !== undefined) && isCached && (
                    <CachedImage 
                        mutable
                        source={{uri: url}}  
                        style={[styles.avatar, {width: sizeAvatar, height: sizeAvatar, borderRadius: sizeAvatar / 2}]} 
                        resizeMode="cover"  />
                )}
                {(url !=='' && url !== null && url !== undefined) && !isCached && <Image  source={{uri: url}} style={[styles.avatar, {backgroundColor:'green', width: sizeAvatar, height: sizeAvatar, borderRadius: sizeAvatar / 2}]} resizeMode="cover" />}
                {showEdit && (
                    <View style={[styles.edit,{width: sizeEdit, height: sizeEdit}]}>
                        <Image source={images.plusCategory} style={[{width: sizeEdit * 0.6, height: sizeEdit * 0.6, tintColor: colors.mainColor} ]} resizeMode="contain" />
                    </View>
                )}
                {showTicket && (
                      <View style={[styles.edit,{width: sizeEdit, height: sizeEdit}]}>
                      <Image source={images.verify} style={[{width: sizeEdit * 0.7, height: sizeEdit * 0.7} ]} resizeMode="contain" />
                  </View>
                )}
                {showBadge && (
                    <View style={styles.ratingBadge}>
                        <Image source={images.star.fill} style={styles.star} />
                        <Label fontSize={12} style={{marginLeft: 5}}>{rating}</Label>
                    </View>
                )}
            </View>
        </Root>
    )
}

const styles = StyleSheet.create({
    avatarContainer: {
        backgroundColor: colors.white,
        alignItems:'baseline',
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
    },
    shadow:{
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    avatar: {
        position:'absolute',
        overflow: 'hidden'
    },
    edit:{
        position:'absolute',
        right: 0,
        top: 0,
        backgroundColor: colors.white,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center'
    },
    star:{
        width: 10,
        height: 10
    },
    ratingBadge:{
        flexDirection:'row',
        position:'absolute',
        top: '100%',
        marginTop: -5,
        backgroundColor: colors.white,
        padding: 2,
        borderRadius: 15,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    }
})
export default AvatarPicker