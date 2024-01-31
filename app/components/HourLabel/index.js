import React from 'react'
import { View, Image,StyleSheet, Dimensions} from 'react-native'
import Label from '../text/Label'
import { dateToHumanFormat2, timeToHumanFormat } from '../../utils/date'
import { images } from '../../assets'
import colors from '../../utils/colors'


const windowWidth = Dimensions.get('window').width

const isSmall = windowWidth <= 375

const HourLabel = ({jobDetail, showLine = true, overrideColor}) => {

    const linestyle = showLine ? styles.bottomLine : {}
    const tintColor = overrideColor ? overrideColor : colors.black
    const iconSize = isSmall ? 15: 20
    const marginLeft = isSmall ? 5 : 10
    const fontSize = isSmall ? 10 : 12
    const marginTop = isSmall ? 10 : 0


    return (
        <View style={linestyle}>
            <View style={{flexDirection: 'row'}}>
            <Image source={images.calendar} style={{width: iconSize, height: iconSize,  tintColor}} resizeMode="contain" />
            <View style={{flexDirection: 'row'}}>
            {jobDetail.isBetween && (
                <Image source={images.timeLapse} style={{width: 11, height: 35, marginLeft , alignSelf: 'center',  tintColor}} resizeMode="contain" />
            )}
                <View>
                    <Label fontSize={fontSize} color={tintColor} style={{marginLeft }}>{dateToHumanFormat2(new Date(jobDetail.fromDate))}</Label>
                    {jobDetail.isBetween && (
                            <Label fontSize={fontSize} color={tintColor} style={{marginLeft, marginTop}}>{dateToHumanFormat2(new Date(jobDetail.toDate))}</Label>
                        )}
                </View>
            </View>
            <Image source={images.waitingBid} style={{width: iconSize, height: iconSize, marginLeft: 10, tintColor}} resizeMode="contain" />
            <View style={{flexDirection: 'row'}}>
            {jobDetail.isBetweenHour && (
                <Image source={images.timeLapse} style={{width: 11, height: 35, marginLeft, alignSelf: 'center',  tintColor}} resizeMode="contain" />
                )}
                <View>
                <Label fontSize={fontSize} color={tintColor} style={{marginLeft }}>{timeToHumanFormat(new Date(jobDetail.fromTime))}</Label>
                    {jobDetail.isBetweenHour && (
                            <Label fontSize={fontSize} color={tintColor} style={{marginLeft, marginTop}}>{timeToHumanFormat(new Date(jobDetail.toTime))}</Label>
                        )}
                </View>
            </View>
            
        </View>
        </View>
    )
}

const styles = StyleSheet.create({
 
    bottomLine: {
        borderBottomWidth: StyleSheet.hairlineWidth, 
        borderBottomColor: '#CCC',
        padding: 20,  
    },
   
})

export default HourLabel