import React, { useEffect } from 'react'
import { View, FlatList, Image, StyleSheet, TouchableOpacity } from 'react-native'
import Label from '../../components/text/Label'
import Heading from '../../components/text/Heading'
import LinearGradient from 'react-native-linear-gradient'
import { shadeColor } from '../../utils/String'
import AvatarPicker from '../../components/AvatarPicker'
import Card from '../../components/card'
import { dateToHumanFormat2, timeToHumanFormat } from '../../utils/date'
import { images } from '../../assets'
import { moneyFormat} from '../../utils/number'
import { cutString } from '../../utils/String'
import colors from '../../utils/colors'

const Item = ({ job }) => {
    return (
        <View key={`job_${job.id}`} style={{height: 200, paddingHorizontal: 20, paddingBottom: 20, paddingTop: 10, alignItems: 'center', justifyContent: 'center'}}>
                <Card padding={0} style={{flex: 1}}>
                    
                <LinearGradient colors={['#FFFFFF', shadeColor('#FFFFFF', 40)]} style={styles.gradient} >
                <Image source={images.engineQuarter} style={{width: 140, height: 140, position: 'absolute', bottom:0, right:0, tintColor: colors.winterWhite}}   />
                    
                <TouchableOpacity onPress={() => {

                }} style={{padding: 10, flex: 1,}}>
                        
                        <Heading color={colors.mainColor} fontSize={20}>{job.job_name}</Heading>
                        <Label color={colors.mainColor}>{cutString(job.description, 80)}</Label>
                    
                        <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems:'center'}}>
                            <View style={{flexDirection: 'row',}}>
                                <Image source={images.calendar} style={{width: 20, height: 20, tintColor: colors.mainColor}} resizeMode="contain" />
                                <Label color={colors.darkGray} style={{marginLeft: 10}}>{dateToHumanFormat2(new Date(job.fromDate))}</Label>
                                <Image source={images.waitingBid} style={{width: 20, height: 20, marginLeft: 10, tintColor: colors.mainColor}} resizeMode="contain" />
                                <Label color={colors.darkGray} style={{marginLeft: 10}}>{timeToHumanFormat(new Date(job.job_time))}</Label>
                            </View>
                            
                            <View style={[styles.capsule, { backgroundColor: job.category.color1}]}>
                                <Image source={{ uri: job.category.image}} style={{width: 24, height: 24}} resizeMode="contain"  />
                                <Label color="white" fontSize={12} style={{marginLeft: 5, flex: 1}}>{job.category_name}</Label>
                            </View>
                        </View>
                        
                        
                        <View style={{flex: 1, width:'100%', flexDirection:'row', alignItems:'flex-end', justifyContent: 'space-between',position:'absolute',left:0, bottom: 0}}>
                            <View style={{padding: 10}}>
                                
                                {job.workersBids && job.workersBids.length > 0 && (
                                    <>
                                        <Label color={colors.darkGray}>Ofertas Activas</Label>
                                        <View style={styles.bidders}>
                                        {job.workersBids.map(({vendor_image}) => (
                                            <AvatarPicker 
                                                sizeType="tiny" 
                                                url={vendor_image} 
                                                style={styles.floatAvatar} />
                                        ))}
                                        </View>
                                    </>
                                )}
                                
                            </View>
                            <Heading color={colors.mainColor} fontSize={40}>{moneyFormat(job.initial_amount)}</Heading>
                        </View>
                        
                    </TouchableOpacity>
                    </LinearGradient>
                    
                </Card>
            </View>
    )
}

const MyRunningServicesScreen = ({ get, list }) => {

    useEffect(() => {
        get()
    }, [])


    return (
        <View style={styles.container}>
             <FlatList
            data={list}
            renderItem={({item}, index)=>{
            return (
                <Item job={item} />
                )
            }}
            keyExtractor={({job_id}) => `key_${job_id}`}
            style={{flex: 1}}
        />
           
        </View>
    )
}

const styles = StyleSheet.create({
    container: { 
        flex: 1
    },
    gradient:{
        width:'100%', height:'100%',
            borderRadius: 10
        },
       
        item:{
            borderColor: '#CFE5FF',
            backgroundColor:'#E9F3FF',
            borderWidth: 1,
            padding: 20,
            borderRadius: 10,
            flexDirection: 'row',
            alignItems:'center'
        },
        lottie:{
            width: 260,
            height: 260,
            alignSelf:'center'
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
            padding: 20,
            height: 200
        },
        capsule:{
            maxWidth: 140,
            flexDirection: 'row',
            backgroundColor: colors.card.green,
            paddingVertical: 4,
            paddingHorizontal: 10,
            borderRadius: 20,
            marginTop: 10,
            alignSelf:'baseline',
            alignItems:'center'
        },
        bottomCard:{
            alignItems: 'center',
            borderTopWidth: 1,
            borderTopColor: colors.card.green,
            marginTop: 10,
            padding: 18
        },
        pagerView:{
            height: 240,
        },
        bidders:{ 
            flexDirection: 'row',
            height: 30,
            marginTop: 5
        },
        floatAvatar:{
            position: 'absolute',
        }
})

export default MyRunningServicesScreen