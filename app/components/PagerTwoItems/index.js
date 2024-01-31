import React, { useState } from 'react'
import { View, TouchableOpacity, Image, StyleSheet, ImageBackground , Dimensions} from 'react-native'
import PagerView from 'react-native-pager-view'
import SemiHeading from '../text/SemiHeading'
import { groupInTwoItems } from '../../utils/array'
import Card from '../card'
import colors from '../../utils/colors'
import PaginationDot from 'react-native-animated-pagination-dot'

import { CachedImage } from 'react-native-img-cache'
import { useNavigation } from '@react-navigation/native'
import { images } from '../../assets'
import Label from '../../components/text/Label'
import { dateToHumanFormat2, timeToHumanFormat } from '../../utils/date' 

const windowWidth = Dimensions.get('window').width

const isSmall = windowWidth <= 375

const Item = ({ item, onPress }) => {

    const iconSize = isSmall ? 12 : 18
    const marginTop = isSmall ? 5 : 10
    const nameFontSize = isSmall ? 12 : 14
    const labelFontSize = isSmall ? 10 : 12
    const principalMarginTop = isSmall ? 20 : 10

    return (
        <TouchableOpacity  onPress={onPress} style={{flexDirection: 'row', height: 100, marginTop: principalMarginTop }}>
            <Card style={{flex: 1, flexDirection: 'row', backgroundColor:'#F0FFE8'}}>
                <View style={{width: 70, height: 70}}>
                    <ImageBackground
                    source={images.coverImage}
                    style={{width: 70, height: 70, borderRadius: 10, overflow: 'hidden'}}
                    resizeMethod="scale">
                    {item.images.length > 0 && (
                        <CachedImage source={{uri: item.images[0]}} mutable style={{width: 80, height: 80}} />
                    )}
                    </ImageBackground>
                </View>
                <View style={{flex: 1, flexDirection: 'column', marginLeft: 10}}>
                    <View style={{ width: '100%' ,flexDirection: 'row' ,alignItems: 'space-between'}}>
                        <SemiHeading 
                            color={colors.rawTitle} 
                            fontSize={nameFontSize} 
                            style={{flex: 1}}>{item.job_name}</SemiHeading>
                    </View>
                    <View style={styles.capsuleTime}>
                        <Image source={images.calendar} style={{width: iconSize, height: iconSize, tintColor: colors.mainColor}} resizeMode="contain" />
                        <Label fontSize={labelFontSize}  color={colors.gray} style={{marginLeft: 10}}>{dateToHumanFormat2(new Date(item.fromDate))}</Label>
                        <Image source={images.waitingBid} style={{width: iconSize, height: iconSize, marginLeft: 10, tintColor: colors.mainColor}} resizeMode="contain" />
                        <Label fontSize={labelFontSize} color={colors.gray}  style={{marginLeft: 10}}>{timeToHumanFormat(new Date(item.job_time))}</Label>
                    </View>
                    <Label color={colors.rawSubtitle} fontSize={12} style={{marginTop }}>{`${item.address.street} ${item.address.housenumber}`}</Label>
                </View>
            </Card>
        </TouchableOpacity>
    )
}

const PagerTwoItems = ({ jobs, navigateScreen }) => {

    const navigation = useNavigation()
    const [page, setPage] = useState(0)
    const formatJobs = groupInTwoItems(jobs)

    return (
        <>
        <PagerView 
            initialPage={0}
            style={{width:'100%', height: jobs.length > 1 ? 240 : 130}} 
            onPageScroll={ ({ nativeEvent}) => {
                setPage(nativeEvent.position)
                }}>
                {formatJobs.map((job, index) => (
                    <View key={`key_${index}`}  style={{padding: 10}}>
                    {job.map(job => (
                        <Item 
                            key={`key_${job.job_id}`} 
                            item={job}
                            onPress={() => {
                                navigation.navigate(navigateScreen, {screen:'CurrentJob', params: { job } })
                            }}
                        />
                    ))}
                    </View>
                ))}
        </PagerView>
        {jobs.length > 2 && (
             <View style={{alignItems: 'center', paddingHorizontal: 20, marginTop: 20}}>
             <PaginationDot 
                 activeDotColor={colors.mainColor} 
                 curPage={page} 
                 maxPage={formatJobs.length}
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
        marginTop: 5
    }
})

export default PagerTwoItems

