import React, { useState,useRef, useEffect } from 'react'
import { View, StyleSheet,Easing, Animated, Modal, Alert, Image, ScrollView, ImageBackground, TouchableWithoutFeedback, KeyboardAvoidingView } from 'react-native'
import Label from '../../components/text/Label'
import Heading from '../../components/text/Heading'
import ActionButton from '../../components/ActionButton'
import InputText from '../../components/InputText'
import OfferInput from '../../components/OfferInput'
import { SafeAreaView } from 'react-native-safe-area-context'
import { images } from '../../assets'
import colors from '../../utils/colors'
import DatePickerButton from '../../components/Picker/DatePickerButton'
import PickerButton from '../../components/PickerButton'
import InputBigNumber from '../../components/InputBigNumber'
import CarouselPhoto from '../../components/CarouselPhoto'
import CardMap from '../../components/CardMap'
import { getNameFormatLowerCase } from '../../utils/String'
import { dateToHumanFormat2, timeToHumanFormat } from '../../utils/date'
import { moneyFormat }  from '../../utils/number'
import Ranking from '../../components/Ranking'
import { replaceEmail, replacePhone } from '../../utils/String'
import CollapseLabel from '../../components/CollapseLabel'
import Header from '../../components/Header'
import analytics from '@react-native-firebase/analytics'
import { useNavigation } from '@react-navigation/core'
import { getRating } from '../../utils/number'

const measures = [
    'Horas',
    'Dias',
]

const JobDetailScreen = ({ route, user, post, get, jobDetail, isLoading, deleteAction }) => {

    const job = route.params.item
    const [ description, setDescription] = useState('')
    const [visible, setVisible] = useState(false)
    const [visible2, setVisible2] = useState(false)
    const [bidDate, setBidDate] = useState(new Date())
    const [bidTime, setBidTime] = useState(new Date())
    const [amount, setAmount] = useState(`${jobDetail.initial_amount}`)
    const navigation = useNavigation()
    
    const [measure, setMesuare] = useState(measures[1])
    const [deliveryTime, setDeliveryTime] = useState('')

    const position = useRef(new Animated.Value(-400)).current
    const position2 = useRef(new Animated.Value(-400)).current
    const backgroundOpacity = useRef(new Animated.Value(1)).current
    

    useEffect(() => {

        analytics().logSelectContent({
            content_type: 'job',
            item_id: job.job_id,
        })

        get({ jobId: job.job_id })
    }, [])

    useEffect(() => {
        setBidDate(new Date(jobDetail.fromDate))
        setBidTime(new Date(jobDetail.fromTime))
        setAmount(jobDetail.initial_amount)
    }, [jobDetail])


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

    const becomeWorker = () => {
        Alert.alert(
            'Registro Worker',
            'Aún no eres Worker, ¿quieres crear tu perfil?',
            [
              {
                text: 'Aún no',
                onPress: () =>{
                  
                },
              }, 
              {
                text: 'Si',
                onPress: () => {
                    navigation.navigate('BeWorkerFlow')
                },
              },
            ],
            {cancelable: false, onDismiss: () => {}},
          )
    }

    const addBankAccount = () => {
        Alert.alert(
            'Cuenta Bancaria',
            'Antes de ofertar debes agregar tu cuenta bancaria para el deposito del servicio',
            [

              {
                text: 'Aceptar',
                onPress: () => {
                    navigation.navigate('AddAccountBank')
                },
              },
            ],
            {cancelable: false, onDismiss: () => {}},
          )
    }



    const openModal = () => {

        if(user.type === 'HIRE'){
            becomeWorker()
            return
        }

        if(user.marketplace === undefined || user.marketplace === null){
            addBankAccount()
            return
        }
     
        
        setVisible(true)

        Animated.timing(position, {
            toValue: 0,
            duration: 300,
            useNativeDriver: false,
            easing: Easing.linear,
          }).start()
         
    }

    const openModal2 = () => {
        setVisible2(true)

        Animated.timing(position2, {
            toValue: 0,
            duration: 300,
            useNativeDriver: false,
            easing: Easing.linear,
          }).start()
    }

    const rejectJob = () => {
        Alert.alert(
            'Nueva Oferta',
            '¿Quieres rechazar el servicio?',
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

    const closeModal = () => {
        Animated.timing(position, {
            toValue: -400,
            duration: 400,
            useNativeDriver: false,
            easing: Easing.linear,
          }).start(() => {
            setVisible(false)
          })
    }


    const closeModal2 = () => {
        Animated.timing(position2, {
            toValue: -400,
            duration: 400,
            useNativeDriver: false,
            easing: Easing.linear,
          }).start(() => {
            setVisible2(false)
          })
    }

    const sendBid = () => {
        closeModal()
        post({ 
            job,
            bid:{
                counteroffer_amount: parseFloat(amount),
                comment: replaceEmail(replacePhone(description)),
                deliveryTime: (jobDetail.type === 'direct') ? 0 : parseFloat(deliveryTime),
                deliveryTimeMeasure: (jobDetail.type === 'direct') ? 0 : measure,
                type: jobDetail.type,
                bidDate: bidDate.getTime(),
                bidTime: bidTime.getTime(),
            }
        })
    }

    const getDateStr = () => {

        if(jobDetail.isBetween){
            return `${dateToHumanFormat2(new Date(jobDetail.fromDate))} / ${dateToHumanFormat2(new Date(jobDetail.toDate))}`
        }

        return dateToHumanFormat2(new Date(jobDetail.fromDate))
    }

    const getHourStr = () => {
        if(jobDetail.isBetweenHour){
            return `Entre ${timeToHumanFormat(new Date(jobDetail.fromTime))} y las ${timeToHumanFormat(new Date(jobDetail.toTime))}`
        }

        return `A las ${timeToHumanFormat(new Date(jobDetail.fromTime))}`
    }

    const isBidPlacedByUser = () => {
        return jobDetail.workersBids && jobDetail.workersBids.filter(({vendor_id}) => vendor_id === user.userId).length > 0
    }

    const getDisabled = () => {
        if(jobDetail.type === 'direct') return description === ''
        return deliveryTime === '' || parseFloat(deliveryTime) <= 0 || description === ''
    }
    

    const headerOpacity = backgroundOpacity.interpolate({
        inputRange: [0, 1],
        outputRange: [1, 0]
    })

    return (

        
        <View style={styles.container}>
             <ImageBackground
                source={images.coverImage}
                style={styles.header}
                resizeMethod="scale">
                {jobDetail && jobDetail.images &&  jobDetail.images.length > 0 && <Image source={{uri: jobDetail.images[0]}} style={{width:'100%', height: 231}} />}
            </ImageBackground>

            <Modal
                animationType="fade"
                transparent={true}
                visible={visible2}
                onRequestClose={() => {}}>
               
               <KeyboardAvoidingView
                behavior="height"
               keyboardVerticalOffset={140}
               style={{flex: 1}}>

<View style={styles.modal}>
                    <TouchableWithoutFeedback onPress={closeModal2} style={{position:'absolute',top:0,flex: 1}}>
                        <View style={{flex: 1}} />
                    </TouchableWithoutFeedback>
                    <Animated.View style={{bottom: position2}}>
                    <SafeAreaView style={styles.bottomView} edges={['right', 'bottom', 'left']}>
                       <View style={{padding: 10}}>
                        <Heading fontSize={20} color={colors.mainColor}>Aceptar servicio</Heading>
                       
                       <InputText
                            label="Comentario del Worker"
                            placeholder="ej: Puedo llegar a primera hora"
                            multiline={true}
                            text={description}
                            onChange={setDescription}
                            style={{marginTop: 10}}
                            height={200}
                        />
                    
                      
                        <View style={{marginTop:20, flexDirection:'row', justifyContent: 'center'}}>
                            <ActionButton
                                text="Confirmar servicio"
                                isDisabled={getDisabled()}
                                onPress={sendBid}
                                style={{flex: 1}}
                                />
                          
                        </View>
                       </View>
                        </SafeAreaView>
                    </Animated.View>
                    </View>
                </KeyboardAvoidingView>
               
            </Modal>

            <Modal
                animationType="fade"
                transparent={true}
                visible={visible}
                onRequestClose={() => {}}>

                       
               <KeyboardAvoidingView
                behavior="height"
               keyboardVerticalOffset={0}
               style={{flex: 1}}>
                <View style={styles.modal}>
                    <TouchableWithoutFeedback onPress={closeModal} style={{position:'absolute',top:0,flex: 1}}>
                        <View style={{flex: 1}} />
                    </TouchableWithoutFeedback>
                    <Animated.View style={{bottom: position}}>
                    <SafeAreaView style={styles.bottomView} edges={['right', 'bottom', 'left']}>
                       <View style={{padding: 10}}>
                        <Heading fontSize={20} color={colors.mainColor}>Contraoferta</Heading>
                        <OfferInput 
                            text={`${amount}`}
                            onChange={value => {
                                setAmount(value)
                            }}
                            />
                       <InputText
                            label="Comentario del Worker"
                            placeholder="ej: Puedo llegar a primera hora"
                            multiline={true}
                            text={description}
                            onChange={setDescription}
                            style={{marginTop: 10}}
                            height={200}
                            
                        />
                        
                        <View style={{ flexDirection: 'row', marginTop: 10}}>
                            <InputBigNumber
                                    label="Tiempo de entrega"
                                    text={deliveryTime}
                                    onChange={setDeliveryTime}
                                    style={{flex: 1}}
                                    fontSize={30}
                                    isMoney={false}
                                    placeholder="0"
                                />
                                
                            <PickerButton
                                    label={'Medida'}
                                    data={measures}
                                    value={measure}
                                    onChange={(value) => {
                                        setMesuare(value)
                                    }}
                                    placeHolder=""
                                    style={{ flex: 1}}
                                />
                        </View>

                         {jobDetail.isBetween &&  (
                            <View style={{height: 70}}>
                                <DatePickerButton 
                                    style={{flex: 1}} 
                                    date={bidDate} 
                                    label="Fecha" 
                                    onChange={({ startDay })=>{
                                        setBidDate(startDay)
                                    }} />
                            </View>
                         )}

                            {jobDetail.isBetweenHour && (
                                <View style={{height: 70}}>
                                    <DatePickerButton 
                                        style={{flex: 1}} 
                                        date={bidTime} 
                                        mode="time"
                                        label="Hora" 
                                        onChange={({ startDay })=>{
                                            setBidTime(startDay)
                                        }} />
                                 </View>
                            )}
                  

                        <View style={{marginTop:20, flexDirection:'row', justifyContent: 'center'}}>
                            <ActionButton
                                text="Realizar Oferta"
                                isDisabled={deliveryTime === '' || parseFloat(deliveryTime) <= 0 || description === ''}
                                onPress={sendBid}
                                style={{flex: 1}}
                                
                                />
                          
                        </View>
                        
                        
                       </View>
                        </SafeAreaView>
                    </Animated.View>
                </View>
                </KeyboardAvoidingView>
            </Modal>
        <ScrollView scrollEventThrottle={20} onScroll={onScroll}>
            <View>
                           
              <View style={{backgroundColor: colors.white, marginTop: 240}}>
                <View style={styles.firstDetail}>
                    
                        {jobDetail && (
                            <View style={{flex: 1}}>
                            <Heading fontSize={18}>{jobDetail.job_name}</Heading>
                            <View style={{flexDirection: 'row', alignItems:'center', marginTop: 10}}>
                            <Label fontSize={12} >{`Públicado por ${getNameFormatLowerCase(jobDetail.user)}`}</Label>
                        </View>
                            {jobDetail.user && <Ranking rank={getRating(jobDetail.user)} style={{marginTop: 5}} />}
                        </View>
                        )}
                       
                   
                </View>

                <View style={styles.dateContainer}>
                    <View style={{alignItems:'center', flexDirection:'row', marginRight: 5}}>
                        <Image source={images.volumenIcon.calendar} style={{width: 24, height: 24}} resizeMode="contain" /> 
                        <Label style={{ marginLeft: 5}}>{getDateStr()}</Label>
                    </View>
                    <View style={{alignItems:'center', flexDirection:'row', marginLeft: 5}}>
                        <Image source={images.volumenIcon.clock} style={{width: 24, height: 24}} resizeMode="contain" /> 
                        <Label style={{marginLeft: 5}}>{getHourStr()}</Label>
                    </View>
                </View>
                
                
                <View style={{paddingHorizontal: 20, paddingBottom: 10}}>
                    <View style={{flexDirection: 'row', alignItems: 'center', marginTop: 5}}>
                        <Image source={images.volumenIcon.money} style={{width: 24, height: 24, marginLeft: 10}} resizeMode="contain" />    
                        <Label fontSize={16} style={{marginLeft: 5}}>Precio sugerido</Label>
                        <Heading fontSize={18} color={colors.mainColor} style={{marginLeft: 5}}>{moneyFormat(jobDetail.initial_amount)}</Heading> 
                    </View>
                </View>
               

               {isBidPlacedByUser() && (
                   <View style={{padding: 20,width:'100%', flex:1, alignItems: 'center',  borderTopWidth: StyleSheet.hairlineWidth,
                   borderColor: '#CCC', }}>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                        {jobDetail.type !== 'direct' && <Label style={{textAlign: 'center', marginLeft: 10}}>Ya realizaste una oferta en este servicio, ahora espera la respuesta del cliente.</Label>}
                        {jobDetail.type === 'direct' && <Label style={{textAlign: 'center', marginLeft: 10}}>Ya aceptaste este servicio, espera que el cliente realice el pago y el servicio quedara agendado automáticamente.</Label>}
                        <Image source={images.volumenIcon.handOk} style={{width: 48, height: 48, marginLeft: 10}} resizeMode="contain" />    
                    </View> 
                   </View>
               )}
               
                {!isLoading && !isBidPlacedByUser() && jobDetail.type !== 'direct'  && (
                    <View style={{paddingHorizontal: 20,width:'100%', flex:1, alignItems: 'center', paddingBottom: 10}}>
                        <ActionButton
                            rightIcon={images.bublePrice}
                            text="Ofertar"
                            onPress={openModal}
                            style={{width:'100%', marginVertical: 10}}
                            />
                    </View>
                )}

                {!isBidPlacedByUser() && jobDetail.type === 'direct' && (
                     <View style={{paddingHorizontal: 20,width:'100%', flex:1, alignItems: 'center', paddingBottom: 10}}>
                         
                        <ActionButton
                            rightIcon={images.handshake}
                            text="Aceptar servicio"
                            onPress={openModal2}
                            style={{width:'100%', marginVertical: 10}}
                            backgroundColor={colors.mainColor}
                        />
                       <ActionButton
                            text="Rechazar servicio"
                            onPress={rejectJob}
                            style={{width:'100%', marginVertical: 10}}
                            backgroundColor={colors.red.normal}
                        />
                    </View>
                )}
                
                {isLoading && (
                     <View style={{marginTop:20, flexDirection:'row', justifyContent: 'center', paddingHorizontal: 20, paddingBottom: 10}}>
                        <Label style={{alignSelf:'center'}}>Ofertando</Label>
                    </View>
                )}
               
                {jobDetail && (
                    <View style={styles.description_container}>
                    <CollapseLabel
                        text={jobDetail.description ? jobDetail.description : ''}
                    />
                    </View>
                )}
              

             
             
                {jobDetail && jobDetail.images && jobDetail.images.length > 0 && (
                    <View style={{alignItems:'flex-start', padding: 20}}>
                        <Heading>Fotos de referencia</Heading>
                        <CarouselPhoto images={jobDetail.images} />
                    </View>
                )}
                {jobDetail && jobDetail.address && (
                    <View style={{paddingHorizontal: 20, marginTop: 20, marginBottom: 30}}>
                        <CardMap address={jobDetail.address} isLoading={false} />
                    </View>
                )}
               
              </View>
            </View>
        </ScrollView>     
        <Animated.View style={{flex: 1, width:'100%', alignSelf:'baseline', position: 'absolute', top:0, width: '100%', opacity: headerOpacity}}>
            {jobDetail && <Header title={jobDetail.job_name} hideBackButton={true} />}
        </Animated.View>
             
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white,
        justifyContent:'space-between'
    },
    description_container: {
        padding: 20, 
        borderTopWidth: StyleSheet.hairlineWidth,
        borderColor: '#CCC',
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: '#CCC'
    },
    detail_container:{
        flexDirection:'row',
        justifyContent: 'space-between',
        padding: 20, 
        borderTopWidth: StyleSheet.hairlineWidth,
        borderColor: '#CCC',
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: '#CCC'
       
    },
    bottom:{
        padding: 20,
        backgroundColor: colors.white,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: -2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    modal:{
        flex: 1,
        flexDirection:'column',
        backgroundColor:'rgba(0,0,0,0.6)',
        justifyContent:'flex-end'
    },
    bottomView:{

        backgroundColor: colors.white,
        borderTopColor:'#CCC',
        justifyContent:'flex-end',
        borderTopWidth: StyleSheet.hairlineWidth,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        paddingTop: 10
    },
    header: {
        flex: 1,
        width: '100%',
        height: 231,
        position: 'absolute',
    },
    firstDetail:{
        flexDirection:'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        paddingHorizontal: 20,
        paddingTop: 20,
    },
    dateContainer:{
        padding: 10,
        backgroundColor: colors.winterWhite,
        flexDirection: 'row',
        borderRadius: 10,
        alignSelf: 'baseline',
        marginLeft: 20,
        marginBottom: 10,
        marginTop: 15
    
    }
})

export default JobDetailScreen