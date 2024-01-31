import React, { useState, useEffect, useRef } from 'react'
import { View, StyleSheet, Animated, Image, ScrollView, Easing, Alert, KeyboardAvoidingView } from 'react-native'
import Label from '../../components/text/Label'
import Heading from '../../components/text/Heading'
import ActionButton from '../../components/ActionButton'
import { images } from '../../assets'
import Card from '../../components/card'
import colors from '../../utils/colors'
import PagerView from 'react-native-pager-view'
import PaginationDot from 'react-native-animated-pagination-dot'
import { useNavigation } from '@react-navigation/native'
import CardMap from '../../components/CardMap'
import JobTopInfoCard from '../../components/Commons/JobTopInfoCard'
import ContactCard from '../../components/Commons/ContactCard'
import PaymentModal from '../../components/PaymentModal'
import BottomSlider from '../../components/Commons/BottomSlider'
import BidCard from '../../components/BidCard'
import CarouselPhoto from '../../components/CarouselPhoto'
import Header from '../../components/Header'
import InputText from '../../components/InputText'
import Spinner from 'react-native-loading-spinner-overlay'

const RunningJobScreen = ({ route, deleteAction, deleteBid, isLoadingStatus, isLoading, get, jobDetail, changeStatus, isWaitingDelete , releasePayment, post, user}) => {

    const scrollViewRef = useRef()
    const navigation = useNavigation()
    const job = route.params.job
    const [page, setPage] = useState(0)
    const [visible, setVisible] = useState(false)
    const [selectedBid, setSelectedBid] = useState()
    const [isHideHelp, setIsHideHelp] = useState(true)
    const [message, setMessage] = useState('')

    const backgroundOpacity = useRef(new Animated.Value(1)).current


    useEffect(() => {
        if(!isHideHelp){
            scrollViewRef.current.scrollToEnd({ animated: true })
        }
        
    }, [isHideHelp])

    const openModal = () => {
        setVisible(true)
    }

    const onAcept = () => {
        setVisible(false)
        setTimeout(() => {
            navigation.navigate('Payment',  {...selectedBid, action:{
                type: 'GET.JOBDETAIL.START',
                data: { jobId: job.job_id }
            }})
        }, 500)
    }

    const onCancel = () => {
        setVisible(false)
    }

    useEffect(() => {
        get({ jobId: job.job_id })
    }, [])

    const onDeleteJob = () => {
        Alert.alert(
            '¿Quieres cancelar el servicio?',
            (jobDetail.status === 'STARTED' || jobDetail.status === 'ACCEPTED') ? 'Recuerda que al cancelar el servicio, seras penalizado con el 15% del monto pagado.' : '¿Quieres cancelar el servicio?',
            [
              {
                text: 'No',
                onPress: () =>{},
              }, 
              {
                text: 'Si',
                onPress: () => {
                    deleteAction({ job })
                },
              },
            ],
            {cancelable: false, onDismiss: () => {}},
          )
    }

    const onCancelBid = (item) => {
        Alert.alert(
            'Cancelar',
            '¿Estás seguro de cancelar esta oferta?',
            [
              {
                text: 'No',
                onPress: () =>{},
              }, 
              {
                text: 'Si',
                onPress: () => {
                    deleteBid({
                        bid_id: item.bid_id,
                        job_id: job.job_id
                    })
                },
              },
            ],
            {cancelable: false, onDismiss: () => {}},
          )
    }

    const onReportJob = () => {
        setIsHideHelp(false)
    }

     const postMessage = () => {
        post({
            message
        })
    }
    const animateBackground = (toValue) => {
        Animated.timing(backgroundOpacity, {
            toValue: toValue,
            duration: 100,
            useNativeDriver: false,
            easing: Easing.linear
          }).start()
    }

    const onScroll = ({nativeEvent})=>{
        animateBackground((nativeEvent.contentOffset.y > 50) ? 0 : 1)  
    }

    const headerOpacity = backgroundOpacity.interpolate({
        inputRange: [0, 1],
        outputRange: [1, 0]
    })


    return (

        <>
         <Spinner
                visible={isWaitingDelete}
                textContent={'Cancelando Servicio'}
                textStyle={styles.spinnerTextStyle}
                />
         <Spinner
                visible={isLoadingStatus}
                textContent={'Validando estado'}
                textStyle={styles.spinnerTextStyle}
                />
        <KeyboardAvoidingView
        behavior="height"
        keyboardVerticalOffset={0}
        style={styles.container}>
             <PaymentModal
                visible={visible}
                onAcept={onAcept}
                onCancel={onCancel}
             />
            
            <Animated.Image source={images.deco.header} style={[styles.header, {opacity: backgroundOpacity}]} resizeMethod="scale" />
            
            <ScrollView ref={scrollViewRef} style={{flex:1}} scrollEventThrottle={20} onScroll={onScroll}>
            <View style={{flex: 1}}>

                <JobTopInfoCard
                    jobDetail={jobDetail}
                 />


                {(jobDetail.vendor_name && jobDetail.status !== 'PAID' && jobDetail.status !== 'CANCELED') && (
                    <ContactCard
                     jobDetail={jobDetail}
                     userName={jobDetail.vendor_name ? jobDetail.vendor_name : undefined}
                     userImage={jobDetail.vendor_image ? jobDetail.vendor_image : undefined}
                     placeHolder="Escribele al Worker"
                     />
                )}

               {(jobDetail.bids && jobDetail.bids.length > 0 && jobDetail.status === 'POSTED') && (
                    <>
                     <View style={{paddingHorizontal: 20}}>
                        <Heading  color={colors.text.title}>{jobDetail.type === 'direct' ? 'RESPUESTA DEL WORKER': 'REVISA LAS OFERTAS QUE HAS RECIBIDO'}</Heading>
                    </View>

                    <PagerView 
                        initialPage={0}
                        style={styles.pagerView} 
                        onPageScroll={ ({ nativeEvent}) => {
                            setPage(nativeEvent.position)
                        }}>
                        {jobDetail.bids.map((item, index) => (
                            <BidCard key={`card_${index}`} item={item} onPress={() => {
                                
                                setSelectedBid(item)
                                openModal()
                            }}
                            onCancel={onCancelBid}
                            />
                        ))}
                    </PagerView>

                {jobDetail.bids.length > 1 && (
                    <View style={{alignItems: 'center'}}>
                        <PaginationDot 
                            activeDotColor={colors.mainColor} 
                            curPage={page} 
                            maxPage={jobDetail.bids.length}
                            sizeRatio={1.0}
                        />
                    </View>
                )}
              
                    </>
                )}

                {!jobDetail.bids || jobDetail.bids.length === 0 && jobDetail.type !== 'direct' && (
                    <View style={{padding: 20}}>
                        <Card style={{flexDirection: 'row', alignItems:'center'}}>
                            <Image source={images.volumenIcon.armchair} style={{width: 130, height: 130}} resizeMode="contain" />
                            <View style={{flex: 1}}>
                                <Heading fontSize={14}>Aquí podrás revisar las ofertas</Heading>
                                <Label fontSize={12} style={{marginTop: 10}}>Cuando los Workers vean tu requerimiento, no dudaran en escribirte con una oferta</Label>
                            </View>
                        </Card>
                    </View>
                )}
               

               {(job && job.images && job.images.length > 0 || isLoading) && (
                        <View style={{paddingHorizontal: 20, marginTop: 20}}>
                        <Heading  color={colors.text.title}>IMAGENES DEL SERVICIO</Heading>
                        <CarouselPhoto 
                        images={job.images}
                        isLoading={isLoading}
                        />
                        </View>
               )}
              
                {jobDetail.address && (
                        <View style={{paddingHorizontal: 20, marginTop: 20}}>
                            <CardMap isLoading={!jobDetail.address} address={jobDetail.address} />
                        </View>
                )}  
               
                {jobDetail.user && 
                user.userId === jobDetail.user.userId && 
                (jobDetail.status === 'POSTED' || jobDetail.status === 'ACCEPTED') && (
                    <View style={{paddingHorizontal: 20 }}>
                                        
                        <ActionButton 
                            text="Cancelar Servicio"
                            onPress={onDeleteJob}
                            backgroundColor={colors.capsule.red}
                            style={{marginTop: 20}}
                            />
                     
                    </View>
                )}
                <View style={{paddingHorizontal: 20, paddingBottom: 40}}>
                                        
                                        
                                        {isHideHelp && (<ActionButton 
                                            text="Reportar Servicio"
                                            onPress={onReportJob}
                                            style={{marginTop: 20}}
                                            />
                                        )}
                                            {!isHideHelp && (
                                            <>
                                            <InputText
                                                label="Reportar problema"
                                                placeholder=""
                                                multiline={true}
                                                text={message}
                                                onChange={setMessage}
                                                style={{marginTop: 20}}
                                                height={120}
                                                onFocus={() => {
                                                    scrollViewRef.current.scrollToEnd({ animated: true })
                                                }}
                                            />
                                            <ActionButton
                                                text="Enviar"
                                                onPress={postMessage}
                                                style={{marginTop: 20}}
                                            />
                                            </>
                                        )}
                                        </View>
        
            </View>
            </ScrollView>

            <Animated.View style={{flex: 1, width:'100%', alignSelf:'baseline', position: 'absolute', top:0, width: '100%', opacity: headerOpacity}}>
                <Header title={job.job_name} hideBackButton={true} />
            </Animated.View>
           
          
            {(jobDetail.status === 'STARTED' && jobDetail.started_by === 'WORK') && (
                 <BottomSlider onFinish={() => {
                     changeStatus({job_id: jobDetail.job_id})
                 }} text="Confirmar inicio servicio" />
            )}

            {(jobDetail.status === 'FINISHED') && (
                <BottomSlider onFinish={() => {
                    releasePayment({job_id: jobDetail.job_id})
                }} text="Finalizar y Liberar Pago" />
            )}
            
        </KeyboardAvoidingView>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white,
        justifyContent:'space-between',
    },
    bottom:{
        padding: 20,
        backgroundColor: colors.white
    },
    pagerView:{
        
    },
    header:{
        flex:1,
        width: '100%',
        height: 300,
        position:'absolute',
        top: -40,
    },
    gradient:{
        width:'100%', 
        height: 80,
        padding: 10,
        borderBottomLeftRadius: 10, 
        borderBottomRightRadius: 10,
        flexDirection:'row',
    },
    modal:{
        flex: 1,
        flexDirection:'column',
        backgroundColor:'rgba(0,0,0,0.6)',
        justifyContent:'flex-end'
    },
    bottomSlider: {
        alignItems:'center', 
        paddingHorizontal: 10,
        paddingVertical: 20,
        borderTopWidth: StyleSheet.hairlineWidth,
        borderTopColor: colors.grayLigth,
        
    },
    spinnerTextStyle: {
        color: '#FFF'
    },
})

export default RunningJobScreen