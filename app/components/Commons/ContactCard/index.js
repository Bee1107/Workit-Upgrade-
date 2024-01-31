import React from 'react'
import { View, StyleSheet, TouchableOpacity, Dimensions, Image } from 'react-native'
import AvatarPicker from '../../../components/AvatarPicker'
import Label from '../../../components/text/Label'
import Heading from '../../../components/text/Heading'
import { images } from '../../../assets'
import Card from '../../../components/card'
import colors from '../../../utils/colors'
import { useNavigation } from '@react-navigation/native'
import { dateToHumanFormat2, timeToHumanFormat } from '../../../utils/date'
import SkeletonPlaceholder from 'react-native-skeleton-placeholder'


const windowWidth = Dimensions.get('window').width
const isSmall = windowWidth <= 375

const ContactCard = ({ jobDetail, placeHolder='', showEditDate = true, userName, userImage }) => {

    const navigation = useNavigation()

    const fontSize = isSmall ?  11 : 12
    const iconSize = isSmall ?  15 : 20

    return (

    
             <View style={{paddingHorizontal: 20}}>
             <Card style={{padding: 0}}>
                 <View style={{flexDirection: 'row', padding: 10}}>
                    {!jobDetail.vendor_image && (
                        <SkeletonPlaceholder backgroundColor={colors.skeleton.backgroundColor} highlightColor={colors.skeleton.highlightColor}>
                            <View style={{height: 50}}>
                                <View  style={{width: 50, height: 50, borderRadius: 25}} />
                            </View>
                        </SkeletonPlaceholder>
                    )}
                     {jobDetail.vendor_image && (
                        <AvatarPicker sizeType="small" url={userImage} />
                     )}
                     <View style={{flex: 1, marginLeft: 10}}>
                         {userName && <Heading color={colors.text.title}>{userName}</Heading>}
                         {!userName && (
                             <SkeletonPlaceholder backgroundColor={colors.skeleton.backgroundColor} highlightColor={colors.skeleton.highlightColor}>
                                <View style={{height: 30}}>
                                    <View  style={{width: 200, height: 20, borderRadius: 10}} />
                                </View>
                             </SkeletonPlaceholder>
                         )
                         }
                        
                         <TouchableOpacity style={styles.chatButton} onPress={() => {
                             navigation.navigate('Chat', { id: jobDetail.job_id, user:{
                                 name: jobDetail.vendor_name,
                                 profile_picture: jobDetail.vendor_image,
                                 jobName: jobDetail.job_name,
                                 job: jobDetail,
                                 isGoBack: true
                             } })
                         }}>
                             <Label>{placeHolder}</Label>
                         </TouchableOpacity>
                     </View>
                 </View>
                 
                 <View style={{flexDirection: 'row', padding: 10, justifyContent: 'space-between', alignItems:'center'}}>
                     <Label style={{marginRight: 10}}>Servicio planificado para</Label>
                     <View style={[styles.capsuleTime, {flex:1}]}>
                         <Image source={images.calendar} style={{width: iconSize, height: iconSize, tintColor: colors.mainColor}} resizeMode="contain" />
                         {!jobDetail.vendor_name && (
                             <SkeletonPlaceholder backgroundColor={colors.skeleton.backgroundColor} highlightColor={colors.skeleton.highlightColor}>
                                <View style={{height: 20}}>
                                    <View  style={{width: 35, height: 20, marginLeft: 5, borderRadius: 10}} />
                                </View>
                             </SkeletonPlaceholder>
                         )}
                         {jobDetail.vendor_name && <Label fontSize={fontSize} color={colors.text.title} style={{marginLeft: 10}}>{dateToHumanFormat2(new Date(jobDetail.fromDate))}</Label>}
                         <Image source={images.waitingBid} style={{width: iconSize, height: iconSize, marginLeft: 10, tintColor: colors.mainColor}} resizeMode="contain" />
                         {!jobDetail.vendor_name && (
                             <SkeletonPlaceholder backgroundColor={colors.skeleton.backgroundColor} highlightColor={colors.skeleton.highlightColor}>
                                <View style={{height: 20}}>
                                    <View  style={{width: 35, height: 20, marginLeft: 5, borderRadius: 10}} />
                                </View>
                             </SkeletonPlaceholder>
                         )}
                         {jobDetail.vendor_name && <Label fontSize={fontSize} color={colors.text.title}  style={{marginLeft: 10}}>{timeToHumanFormat(new Date(jobDetail.job_time))}</Label>}
                     </View>
                 </View>
                 {jobDetail.status === 'ACCEPTED' && showEditDate && (
                 <TouchableOpacity style={styles.bottomWorkerCard} onPress={() => {
                     navigation.navigate('EditDate', { jobDetail })
                 }}>
                     <Heading color={colors.mainColor}>Cambiar Fecha Y Hora</Heading>
                 </TouchableOpacity>
                 )}
             </Card>
         </View>

       
    )
}

const styles = StyleSheet.create({
    bottom:{
        padding: 20,
        backgroundColor: 'white'
    },
    chatButton:{
        borderRadius: 20,
        padding: 10,
        backgroundColor: colors.winterWhite,
        marginTop: 5
    },
    bottomWorkerCard: {
        alignItems: 'center', 
        padding: 10,
        borderTopWidth: StyleSheet.hairlineWidth,
        borderTopColor: colors.grayLigth,
        marginTop: 10
    },
    capsuleTime: {
        flexDirection: 'row', 
        padding: 10,
    }
})

export default ContactCard