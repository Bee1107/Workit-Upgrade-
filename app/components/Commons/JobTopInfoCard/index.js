import React from 'react'
import { View, StyleSheet, Dimensions , Image } from 'react-native'
import Heading from '../../../components/text/Heading'
import Card from '../../../components/card'
import colors from '../../../utils/colors'
import LinearGradient from 'react-native-linear-gradient'
import Label from '../../../components/text/Label'
import CollapseLabel from '../../../components/CollapseLabel'
import { images } from '../../../assets'
import SkeletonPlaceholder from 'react-native-skeleton-placeholder'
import HourLabel from '../../HourLabel'
import { moneyFormat} from '../../../utils/number'

const windowWidth = Dimensions.get('window').width

const isSmall = windowWidth <= 375

const SkeletonView = () => (
    <View style={{width: windowWidth, height: 80, padding: 10}}>
        <SkeletonPlaceholder backgroundColor={colors.skeleton.backgroundColor} highlightColor={colors.skeleton.highlightColor}>
            <View style={{flexDirection:'row', alignItems:'center'}}>
                <View  style={{width: 60, height: 60, borderRadius: 30}} />
                <View style={{ alignItems: 'center', flex: 1, justifyContent: 'center'}}>
                    <View  style={{width: 200, height: 20, borderRadius: 8, marginLeft: 10}} />
                </View>
            </View>
        </SkeletonPlaceholder>
    </View>
)

const SkeletonSimple = ({length = 1, width = 200}) => (
    <View style={{width: windowWidth, padding: 10}}>
        <SkeletonPlaceholder backgroundColor={colors.skeleton.backgroundColor} highlightColor={colors.skeleton.highlightColor}>
                <View style={{alignSelf: 'baseline'}}>
                    { Array.from({length}).map((e, index) => (
                        <View key={`key_${index}`}  style={{width, height: 20, borderRadius: 8, marginLeft: 10, marginTop: 5}} />
                    ))}
                </View>
        </SkeletonPlaceholder>
    </View>
)

const statusMap = {
    ACCEPTED: {
        label: () => 'Servicio Aceptado',
        icon: images.volumenIcon.match,
        gradient: ['#74ebd5','#ACB6E5']
    },
    POSTED: {
        label: (type) => type === 'direct' ? 'Esperando respuesta': 'Esperando Ofertas',
        icon: images.volumenIcon.waitingBid,
        gradient: ['#4e54c8','#8f94fb']
    },
    STARTED: {
        label: () => 'Confirmar inicio de servicio',
        icon: images.volumenIcon.waitingBid,
        gradient: ['#3A1C71','#D76D77','#FFAF7B']
    },
    FINISHED : {
        label: () => 'Servicio terminado, liberar pago!',
        icon: images.volumenIcon.walletWaiting,
        gradient: ['#7F00FF','#E100FF']
    },
    PAID : {
        label: () => 'Servicio finalizado',
        icon: images.volumenIcon.checked,
        gradient: ['#0cebeb','#20e3b2','#29ffc6']
    },
    CANCELED: {
        label: () => 'Servicio Cancelado',
        icon: images.volumenIcon.rejectedBid,
        gradient: ['#E33C3C','#912B2B']
    }
}

const getStatus = (status, started_by) => {
    if(status === 'STARTED'){
        if(started_by === 'HIRE'){
            return {
                label: () => 'Servicio en Progreso',
                icon: images.volumenIcon.rocket,
                gradient: ['#1c92d2','#f2fcfe']
            }
        } else {
            return {
                label: () => 'Esperando que el cliente confirme inicio del servicio',
                icon: images.volumenIcon.waitingBid,
                gradient: ['#3A1C71','#D76D77','#FFAF7B']
            }
        }
    } else {
        return (statusMap[status]) ? statusMap[status] : statusMap.POSTED
    }
}


const JobTopInfoCard = ({ jobDetail, hideStatus = false }) => {

    const { gradient, icon, label } = getStatus(jobDetail.status, jobDetail.started_by)
    const iconSize = isSmall ? 20:24
    const fontSize = isSmall ? 10 : 12

    return (
        <View style={styles.container}>
            <Card padding={0} style={styles.card}>
           
                {jobDetail.job_name && (<View style={styles.headerContainer}>
                    <Heading color={colors.text.title}>{jobDetail.job_name}</Heading>
                </View>)}
                {jobDetail.status && (
                    <View style={{flexDirection:'row', alignItems:'center',   borderBottomWidth: StyleSheet.hairlineWidth, 
        borderBottomColor: '#CCC',
        padding: 10, justifyContent:'space-between'}}>
                    <HourLabel 
                        jobDetail={jobDetail}
                        showLine={false}
                    />
                    {jobDetail.category && (
                        <View style={[styles.capsule, { backgroundColor: jobDetail.category.color1}]}>
                            <Image source={{ uri: jobDetail.category.image}} style={{width: iconSize, height: iconSize}} resizeMode="contain"  />
                            <Label color="white" fontSize={fontSize} style={{marginLeft: 5, flex: 1}}>{jobDetail.category_name}</Label>
                        </View>
                    )
                    }
                </View>
                )}
                

                <View style={{flexDirection:'row', justifyContent:'space-between', padding: 10, borderBottomWidth: StyleSheet.hairlineWidth, 
        borderBottomColor: '#CCC', alignItems: 'center'}}>
                    <Label fontSize={16} color={colors.black}>Precio</Label>
                    {jobDetail.initial_amount === null && (
                        <Heading color={colors.black} fontSize={30}>$?</Heading>
                    ) }
                    {jobDetail.initial_amount !== null  && (
                        <Heading color={colors.black} fontSize={30}>{moneyFormat(jobDetail.initial_amount)}</Heading>
                    )}
                    
                </View>
                

                {jobDetail.description && (
                    <View style={styles.container}>
                        <CollapseLabel text={jobDetail.description} />
                    </View>
                )}

              
                                        
                {!hideStatus && jobDetail.status && (
                    <LinearGradient colors={gradient} style={styles.gradient}  >
                        <Image source={icon} style={styles.icon} resizeMode="contain" />
                        <View style={{ alignItems: 'center', flex: 1, justifyContent: 'center'}}>
                            <Heading color="white" fontSize={14} style={{marginLeft: 10}}>{label(jobDetail.type)}</Heading>
                        </View>
                    </LinearGradient>
                )}
                {!jobDetail.status && (
                    <>
                        
                        <SkeletonSimple />
                        <SkeletonSimple length={2} width={260} />
                        <SkeletonView />
                    </>
                )}
                
            </Card>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        padding: 20
    },
    icon: {
        width: 60,
        height: 60,
    },
    card:{
        marginTop: 80
    },
    gradient:{
        width:'100%', 
        height: 80,
        padding: 10,
        borderBottomLeftRadius: 10, 
        borderBottomRightRadius: 10,
        flexDirection:'row',
    },
    headerContainer:{
        padding: 20, 
        borderBottomWidth: StyleSheet.hairlineWidth, 
        borderBottomColor: '#CCC'
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
})

export default JobTopInfoCard