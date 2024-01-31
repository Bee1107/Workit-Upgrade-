import React from 'react'
import { View, StyleSheet, Image, TouchableOpacity } from 'react-native'
import Label from '../../components/text/Label' 
import Heading from '../../components/text/Heading' 
import SemiHeading from '../../components/text/SemiHeading'
import colors from '../../utils/colors'
import LinearGradient from 'react-native-linear-gradient'
import AvatarPicker from '../../components/AvatarPicker'
import Toast from 'react-native-toast-message'
import { timeToHumanFormat } from '../../utils/date'
import { images } from '../../assets'

const getStyle = status => {
    const map = {
        ACCEPTED: {
            color: '#8ED056',
            status: 'Aceptado'
        },
        PAID: {
            color: '#A749A4',
            status: 'Pagado'
        },
        CANCELED: {
            color: '#FF2C29',
            status: 'Cancelado'
        },
        FINISHED: {
            color: '#E8473E',
            status: 'Finalizado'
        },
    }

    if(map[status]){
        return map[status]
    } else {
        return {
            color: '#868686',
            status
        }
    }
}

const CalendarCard = ({index, isPast = false, isFuture = false, item, onPress, month}) => {

    const now = new Date().getDate()
    const job_data = item ? item.sort((a,b) => a.toTime < b.toTime) : []
    const style = (job_data.length > 0)? getStyle(job_data[0].status) : getStyle('NONE')
    const opacity = (index < now - 1 || isPast) ? ((isFuture && !isPast) ? 1.0 : 0.3) : 1.0 

    const onPressCard = () => {
        if(job_data.length === 0){
            Toast.show({
                topOffset: 100,
                text1: 'Workit',
                text2: 'No tienes servicios agendados para este día',
                props:{
                    showBorder: true
                }
                
              })
        } else {
            onPress(job_data)
        }
    }
    
    return (

        <TouchableOpacity onPress={onPressCard} >
            <View style={[styles.card, {paddingBottom: job_data.length > 1 ? 30 : 10}]}>
                
                <View style={[styles.left, { borderRightColor: style.color, borderLeftColor: style.color, opacity }]}>
                    <Heading fontSize={20}>{`${index + 1} ${month}`}</Heading>               
                </View>
                
                {job_data.length > 0 && (
                    <View style={[styles.gradientContainer, { opacity: opacity }]}>
                        {job_data.length > 1 && (
                            <>
                             <LinearGradient 
                                 colors={['#36D1DC', '#5B86E5']}
                                style={[styles.gradient, {width:'100%', position:'absolute', opacity:0.5, top: 18, transform: [{ scale: 0.92 }]}]}  />
                            <LinearGradient 
                                colors={['#36D1DC', '#5B86E5']}
                                style={[styles.gradient, {width:'100%', position:'absolute', opacity:0.7, top: 8, transform: [{ scale: 0.96 }]}]}  />
                            </>
                        )}

                        <LinearGradient colors={['#36D1DC', '#5B86E5']} style={styles.gradient}  >
                            <Heading color="white">{job_data[0].job_name}</Heading>
                            
                            {job_data[0].user && (
                                <View style={{flexDirection: 'row', alignItems: 'center', marginTop: 10}}>
                                    <AvatarPicker 
                                        url={job_data[0].user.profile_picture}
                                        sizeType="tiny"
                                    />
                                    <Label color="white" style={{marginLeft: 5}}>{`${job_data[0].user.name} ${job_data[0].user.father_last_name} ${job_data[0].user.mother_last_name}`}</Label>
                                </View>
                            )}

                            <View style={{justifyContent:'space-between', flexDirection:'row', alignItems:'flex-end'}}>
                                <View style={{backgroundColor: style.color, borderWidth: 1, borderColor:'white', alignItems: 'center', padding: 4, paddingHorizontal: 10, borderRadius: 15, marginTop: 10, alignSelf:'baseline'}}  >
                                    <SemiHeading fontSize={12} color="white">{style.status}</SemiHeading>
                                </View>
                                <View style={{ alignItems: 'center', flexDirection:'row', paddingHorizontal: 10, alignSelf:'flex-end'}}  >
                                    <Image source={images.waitingBid} style={{width: 20, height: 20}} />
                                    <Label fontSize={16} color="white" style={{marginLeft: 10}}>{timeToHumanFormat(new Date(job_data[0].job_time))}</Label>
                                </View>
                            </View>
                            
                        </LinearGradient>
                        
                    </View>
                )}
                {job_data.length === 0 && (
                     <LinearGradient 
                        colors={['#94F7FF', '#C7D8FF']} 
                        style={[styles.cardContainer, { opacity: opacity }]} >
                        <Heading color="white">Sin Programación</Heading>
                    </LinearGradient>
                )}
                
            </View>
        </TouchableOpacity>
    )
}



const styles = StyleSheet.create({
    
 
    card:{
        flexDirection:'row',
        borderTopWidth: StyleSheet.hairlineWidth,
        borderTopColor: colors.grayLigth,
        paddingVertical: 10,
        paddingHorizontal: 20,
       
    },
    left:{
        borderTopLeftRadius: 10,
        borderBottomLeftRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 20,
        paddingHorizontal: 10
    },
    cardContainer:{
        flex: 1,
        justifyContent:'center',
        alignItems: 'center',
        backgroundColor: '#9F9F9F',
        borderRadius: 10,
    },
    gradientContainer:{
        
        flex: 1,
        shadowColor: colors.gradient,
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.25,
        shadowRadius: 10,
        elevation: 5,
 
    },
    gradient:{
        overflow:'hidden', 
        borderRadius: 10,
        padding: 10,
        minHeight: 120,
    }
})


export default CalendarCard