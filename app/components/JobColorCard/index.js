import React, { useEffect} from 'react'
import { View, StyleSheet, Image, TouchableOpacity } from 'react-native'
import Label from '../../components/text/Label' 
import Heading from '../../components/text/Heading' 
import SemiHeading from '../../components/text/SemiHeading'
import colors from '../../utils/colors'
import LinearGradient from 'react-native-linear-gradient'
import AvatarPicker from '../../components/AvatarPicker'
import { timeToHumanFormat, dateToHumanFormat2 } from '../../utils/date'
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
        REJECTED: {
            color: '#FF2C29',
            status: 'Rechazado'
        },
        FINISHED: {
            color: '#E8473E',
            status: 'Finalizado'
        },
        POSTED: {
            color: '#8ED056',
            status: 'Esperando'
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

const JobColorCard = ({ item, onPress, hideStatus = false }) => {

    const job_data = item 
    const style =  getStyle(job_data.status)


    const onPressCard = () => {
        onPress(job_data)
    }
    
    return (
        <TouchableOpacity onPress={onPressCard} >
            <View style={styles.gradientContainer}>
                <LinearGradient colors={['#36D1DC', '#5B86E5']} style={styles.gradient}  >
                    <Heading color="white">{job_data.job_name}</Heading>
                    
                    <View style={{flexDirection: 'row', alignItems: 'center', marginTop: 10}}>
                            <AvatarPicker 
                                url={job_data.user.profile_picture}
                                sizeType="tiny"
                            />
                            <Label color="white" style={{marginLeft: 5}}>{`${job_data.user.name} ${job_data.user.father_last_name}`}</Label>
                        </View>

                    <View style={{justifyContent:'space-between', flexDirection:'row', alignItems:'flex-end'}}>
                        {!hideStatus && (
                             <View style={{backgroundColor: style.color, borderWidth: 1, borderColor:'white', alignItems: 'center', padding: 4, paddingHorizontal: 10, borderRadius: 15, marginTop: 10, alignSelf:'baseline'}}  >
                             <SemiHeading fontSize={12} color="white">{style.status}</SemiHeading>
                         </View>
                        )}
                        {hideStatus && <View />}
                      
                        <View style={{ alignItems: 'center', flexDirection:'row', paddingHorizontal: 10, alignSelf:'flex-end'}}  >
                            <View  style={{ alignItems: 'center', flexDirection:'row', alignSelf:'flex-end', marginRight: 10}} >
                                <Image source={images.calendar} style={{width: 16, height: 16}} resizeMode="contain" />
                                <Label fontSize={16} color="white" style={{marginLeft: 10}}>{dateToHumanFormat2(new Date(job_data.job_time))}</Label>
                            </View>
                            <View  style={{ alignItems: 'center', flexDirection:'row', alignSelf:'flex-end'}} >
                                <Image source={images.waitingBid} style={{width: 16, height: 16}} resizeMode="contain" />
                                <Label fontSize={16} color="white" style={{marginLeft: 10}}>{timeToHumanFormat(new Date(job_data.job_time))}</Label>
                            </View>
                        </View>
                    </View>
                </LinearGradient>
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


export default JobColorCard