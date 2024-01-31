import React from 'react'
import { View, StyleSheet, TouchableOpacity, Image } from 'react-native'
import Label from '../../../components/text/Label'
import colors from '../../../utils/colors'
import AvatarPicker from '../../../components/AvatarPicker'
import { timeToHumanFormat } from '../../../utils/date'
import SemiHeading from '../../../components/text/SemiHeading'
import { images } from '../../../assets'

const ChatItem = props => {

    const { user_profile, badge, onPress, writing, message, haveImage, updateAt, job_name } = props
    const { name, avatar } = user_profile 

    const getMessage = () => {
        if(!message || message===null) return ''
        if(message.length < 30) return message
        return `${message.slice(0, 30)}...`
    }

    return (
        <TouchableOpacity style={styles.container} onPress={onPress}>
            <AvatarPicker url={avatar} sizeType="small"  />
            <View style={{flex: 1, flexDirection:'row', justifyContent: 'space-between', marginLeft: 10}}>
                <View style={{flex: 1}}>
                    {job_name && (
                        <SemiHeading fontSize={12} color={colors.text.title} >{`${job_name}`}</SemiHeading>
                    )}
                    <Label fontSize={12} color={colors.text.subtitle}>{`${name}`}</Label>
                    {!writing && haveImage  && (
                        <View style={{flexDirection:'row', alignItems: 'center'}}>
                            <Image source={images.previewImage} style={{width: 12, height: 12}} resizeMode="contain" />
                            <Label fontSize={12} color={colors.gray} style={{marginLeft: 5}}>Te envio una image</Label>
                        </View>
                    )}
                    {!haveImage && !writing && <Label fontSize={12}  color={colors.gray}>{getMessage()}</Label>}
                    {writing && <Label fontSize={12} color={colors.gray}>Escribiendo...</Label>}
                    
                </View>
                <View style={{ width: 60, alignItems:'flex-end'}}>
                    <Label fontSize={12} color={colors.black}>{timeToHumanFormat(new Date(updateAt))}</Label>
                    {badge > 0 && (
                        <View style={styles.badge}>
                            <Label fontSize={12} color="white">{`${badge > 100 ? '+99': badge}`}</Label>
                        </View>
                    )}
                </View>
              
            </View>
        </TouchableOpacity>
    )
}


const styles = StyleSheet.create({
    container:{
        flex: 1,
        padding: 10,
        flexDirection:'row',
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: colors.grayLigth,
        alignItems: 'center'
    },
    badge:{
        backgroundColor: colors.mainColor,
        borderRadius: 20,
        width: 24,
        height: 24,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10
    }
})

export default ChatItem