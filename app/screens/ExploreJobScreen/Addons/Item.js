import React from 'react'
import { View, TouchableOpacity, ImageBackground, Image, StyleSheet } from 'react-native'
import Label from '../../../components/text/Label'
import Heading from '../../../components/text/Heading'
import SemiHeading from '../../../components/text/SemiHeading'
import AvatarPicker from '../../../components/AvatarPicker'
import CollapseLabel from '../../../components/CollapseLabel'
import Card from '../../../components/card'
import colors from '../../../utils/colors'
import { images } from '../../../assets'
import { moneyFormat} from '../../../utils/number'
import { CachedImage } from 'react-native-img-cache'

const Item = ({ item, onPress, style }) => (
    <TouchableOpacity onPress={onPress} style={[styles.item, style]}>
        <Card padding={0}>
            <View style={{
                        borderTopRightRadius: 10, 
                        borderTopLeftRadius: 10,
                        overflow: 'hidden',
                    }}>
                <ImageBackground source={images.coverImage} style={styles.image} resizeMode="cover">
                    {item.images.length >= 0 && (
                        <CachedImage source={ {uri: item.images[0]}}  style={{position:'absolute', width: '100%', height: 200, top: 0}}/>
                    )}
                    <View style={{justifyContent:'space-between', height: 160, padding: 10}}>
                    <View style={[styles.capsulePrice, { alignSelf:'flex-end'}]}>
                        <Image source={images.tagPrice} style={{width: 24, height: 24, tintColor: colors.black}} resizeMode="contain" />
                        <Heading color={colors.black} fontSize={20} style={{marginLeft: 10}}>{moneyFormat(item.initial_amount)}</Heading>
                    </View>
                    <View style={[styles.capsule, {backgroundColor: colors.white}]}>
                        {item.category_name !== item.subcategory_name && <Label color={colors.black}>{`${item.category_name} / ${item.subcategory_name}`}</Label>}
                        {item.category_name === item.subcategory_name && <Label color={colors.black}>{item.subcategory_name}</Label>}
                    </View>
                    </View>
                </ImageBackground>
                </View>
            <View>
                <View style={{padding: 10}}>
                    <SemiHeading fontSize={22}  color={colors.text.title} >{item.job_name}</SemiHeading>
                    <View style={{flexDirection: 'row', alignItems:'center', marginTop: (item.images.length === 0) ? 10 : 0}}>
                        <AvatarPicker sizeType="tiny" url={item.user.profile_picture} />
                        <Label fontSize={14} color={colors.text.subtitle} style={{marginLeft: 10}}>{`${item.user.name} ${item.user.father_last_name}`}</Label>
                    </View>
                    <CollapseLabel 
                        style={{marginTop: 10}}
                        text={item.description}
                    />
                </View>
                
                <View style={{padding: 10}}>
                    <View style={styles.capsule}>
                        <Image source={images.pin.gradient} style={{width:16, height: 16}} resizeMode="contain" />
                        <Label style={{marginLeft: 10}}>{`${item.address.street} ${item.address.housenumber}`}</Label>
                    </View>
                </View>
            </View>
        </Card> 
    </TouchableOpacity>
)

const styles = StyleSheet.create({
    item:{
        backgroundColor: colors.white,
        justifyContent:'space-between',
        padding: 20,
        flexDirection: 'column',
        alignItems:'center',
    },
    image:{
        width:'100%', 
        height: 160, 
    },
    capsule:{
        paddingVertical: 5,
        paddingHorizontal: 10,
        flexDirection: 'row',
        borderRadius: 10,
        backgroundColor: colors.winterWhite,
        alignSelf: 'baseline',
    },
    capsulePrice:{
        flexDirection: 'row',
        backgroundColor: colors.white,
        alignSelf: 'baseline',
        padding: 5,
        borderRadius: 5
    },
    floatingPrice:{
        position:'absolute',
        top:5,
        right: 10,
        flexDirection: 'row',
        alignSelf: 'center',
    },
})

export default Item