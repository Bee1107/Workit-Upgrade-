import React, { useState } from 'react'
import { View, TouchableOpacity, Image, StyleSheet, ImageBackground } from 'react-native'
import PagerView from 'react-native-pager-view'
import SemiHeading from '../text/SemiHeading'
import Card from '../card'
import colors from '../../utils/colors'
import AvatarPicker from '../../components/AvatarPicker'
import PaginationDot from 'react-native-animated-pagination-dot'

import { CachedImage } from 'react-native-img-cache'
import { useNavigation } from '@react-navigation/native'
import { images } from '../../assets'
import Label from '../../components/text/Label'
import { dateToHumanFormat2, timeToHumanFormat } from '../../utils/date' 
import LinearGradient from 'react-native-linear-gradient'

const typeMap = {
    direct: {
        label: 'Directo',
        icon: images.type.plane
    },
    bidding: {
        label: 'Subasta',
        icon: images.type.subast
    },
    subast: {
        label: 'Subasta',
        icon: images.type.subast
    }
}

const Item = ({ item, onPress }) => {
    return (
        <TouchableOpacity  onPress={onPress} style={{flexDirection: 'row', height: 190}}>
            <Card padding={0}>
                <LinearGradient colors={['#8E2DE2', '#4A00E0']} style={{flexDirection: 'row', padding: 10, borderRadius: 10}}  >
                <View style={{width: 100, height: 120}}>
                    <ImageBackground
                        source={images.coverImage}
                        style={{width: 100, height: 100, borderRadius: 10, overflow: 'hidden'}}
                        resizeMethod="scale">
                        {item.images.length > 0 && <CachedImage source={{uri: item.images[0]}} mutable style={{width: 100, height: 100}} />}
                    </ImageBackground>
                    {typeMap[item.type] && (
                         <View style={{backgroundColor: colors.black, flexDirection: 'row', alignItems:'center', marginTop: 4, paddingHorizontal: 10, borderRadius: 10}}>
                         <Image source={typeMap[item.type].icon} style={{width: 16, height:16,tintColor: colors.white}} resizeMode="contain" />
                         <Label color={colors.white} style={{marginLeft: 5}}>{typeMap[item.type].label}</Label>
                     </View> 
                    )}
                   
                </View>
                <View style={{flex: 1, flexDirection: 'column', marginLeft: 10}}>
                    <View style={{flexDirection:'row', width:'100%', height: 20}}>
                        <SemiHeading fontSize={16} color="white" style={{marginLeft: 10}} >{item.job_name}</SemiHeading>
                    </View>
                    <View style={{ width: '100%' ,flexDirection: 'row' , alignItems: 'center', marginTop: 10}}>
                        <AvatarPicker 
                            url={item.user.profile_picture}
                            sizeType="tiny"
                            />
                        <Label fontSize={12} style={{flex: 1, marginLeft: 10}} color="white">{`Publicado ${item.user.name} ${item.user.father_last_name}`}</Label>
                    </View>
                    <View style={styles.capsuleTime}>
                        <Image source={images.calendar} style={{width: 20, height: 20, tintColor: "white"}} resizeMode="contain" />
                        <Label  color="white" style={{marginLeft: 10}}>{dateToHumanFormat2(new Date(item.fromDate))}</Label>
                        <Image source={images.waitingBid} style={{width: 20, height: 20, marginLeft: 10, tintColor: "white"}} resizeMode="contain" />
                        <Label color="white"  style={{marginLeft: 10}}>{timeToHumanFormat(new Date(item.job_time))}</Label>
                    </View>
                    <Label style={{marginTop: 10}} color="white">{`${item.address.street} ${item.address.housenumber}`}</Label>
                </View>
                </LinearGradient>
                
            </Card>
        </TouchableOpacity>
    )
}

const PagerTwoItems2 = ({ jobs, navigateScreen }) => {

    const navigation = useNavigation()
    const [page, setPage] = useState(0)

    return (
        <>
        <PagerView 
            initialPage={0}
            style={{width:'100%', height: 160}} 
            onPageScroll={ ({ nativeEvent}) => {
                setPage(nativeEvent.position)
                }}>
                {jobs.map((job) =>  (
                    <View key={`key_${job.job_id}`}  style={{padding: 10}}>
                        <Item  
                            item={job}
                            onPress={() => {
                                navigation.navigate(navigateScreen,  { item: job } )
                            }}
                        />
                    </View>
                ))}
        </PagerView>
        {jobs.length > 1 && (
             <View style={{alignItems: 'center', paddingHorizontal: 20, marginTop: 20}}>
             <PaginationDot 
                 activeDotColor={colors.mainColor} 
                 curPage={page} 
                 maxPage={jobs.length}
                 sizeRatio={1.0}
             />
         </View>
        )}
       
    </>
    )
}

const styles = StyleSheet.create({
    capsuleTime: {
        flexDirection: 'row', 
        marginTop: 10
    }
})

export default PagerTwoItems2

