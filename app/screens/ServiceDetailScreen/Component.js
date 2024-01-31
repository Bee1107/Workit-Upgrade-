import React, { useState, useEffect, useRef } from 'react'
import { View, StyleSheet, Image, ScrollView, Switch, Easing, ImageBackground, Animated, TouchableOpacity } from 'react-native'
import Label from '../../components/text/Label'
import Heading from '../../components/text/Heading'
import SemiHeading  from '../../components/text/SemiHeading'
import ActionButton from '../../components/ActionButton'
import InputText from '../../components/InputText'
import InputBigNumber from '../../components/InputBigNumber'
import { images } from '../../assets'
import colors from '../../utils/colors'
import { getNameFormatLowerCase } from '../../utils/String'
import { moneyFormat }  from '../../utils/number'
import Ranking from '../../components/Ranking'
import DatePickerButton from '../../components/Picker/DatePickerButton'
import AddressInput from '../../components/AddressInput'
import PickerButton from '../../components/PickerButton'
import Spinner from 'react-native-loading-spinner-overlay'
import { useNavigation } from '@react-navigation/native'
import { CachedImage } from 'react-native-img-cache'
import Header from '../../components/Header'
import AsyncStorage from '@react-native-async-storage/async-storage'
import {  CITIES_CHILE  } from '../../utils/constants'

const now = new Date()
now.setHours(now.getHours() + 2)

const now2 = new Date()
now2.setHours(now2.getHours() + 3)

const ServiceDetailScreen = ({ route, user,selectedAddress, post, isPostedLoading }) => {
    

    const navigation = useNavigation()

    const job = route.params.item

    const [ description, setDescription] = useState('')

    const [fromDate, setFromDate] = useState(new Date())
    const [toDate, setToDate] = useState(new Date())

    const [fromTime, setFromTime] = useState(now)
    const [toTime, setToTime] = useState(now2)
    const [isBetween, setIsBetween] = useState(false)
    const [isBetweenHour, setIsBetweenHour] = useState(false)
    const [aproach, setAproach] = useState()

    const [trigger, setTrigger] = useState(false)

    const [amount, setAmount] = useState(0)
    const [budget, setBudget] = useState(0)

    const [enabledService, setEnabledService] = useState(true)

    const backgroundOpacity = useRef(new Animated.Value(1)).current

    useEffect(() => {
        AsyncStorage.getItem('@selectedAddress').then(
            response => {
                const { uid } = JSON.parse(response)
                if(user.addresses){
                    const currentAddress = user.addresses.find((item) => item.uid === uid)
                   
                    const result =  [currentAddress.district]

                            .map(district => {
                            return CITIES_CHILE.find(({comunas}) => comunas.includes(district))
                            })
                            .map(({region}) => region)

                    const query = [...result, ...new Set( [currentAddress.district])]
                              
                    
                    
                  
                    const resultFilter = query.map(e => {
                        return job.districts.includes(e)
                     }).find(e => e)
                     
                     setEnabledService(resultFilter ? true : false)

                 
                }
               
            }
        )
    }, [selectedAddress])

    useEffect(() => {
        setBudget(job.amount * amount)
    }, [amount])

    useEffect(() => {
        setTrigger(isBetween)
    }, [isBetween])
  

    const sendBid = () => {

        const payload = {
            name: job.name,
            amount: job.amount * Math.max(1, amount),
            category: job.category,
            subcategory: job.subcategory,
            description,
            fromDate,
            toDate,
            time: fromTime,
            fromTime,
            toTime,
            isBetween,
            isBetweenHour,
            worker_selected: job.worker.userId,
            aproach: job.aproach.length === 1 ? job.aproach[0] : aproach
        }


        post({job: payload})

    }

    const toggleSwitch2 = () => setIsBetween(previousState => !previousState)
    const toggleSwitch3 = () => setIsBetweenHour(previousState => !previousState)

    const animateBackground = toValue => {
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
        <View style={styles.container}>

            <Spinner
                visible={isPostedLoading}
                textContent={'Solicitando servicio'}
                textStyle={styles.spinnerTextStyle}
                />

             <ImageBackground
                source={images.coverImage}
                style={styles.header}
                resizeMethod="scale">
                {job.image !== '' && (
                    <CachedImage 
                       
                        source={{uri: job.image}}
                        style={{width:'100%', height: 231}} 
                        resizeMode="cover"
                        mutable
                    />
                )}
            </ImageBackground>

           

        <ScrollView onScroll={onScroll}>
            <View>
                           
              <View style={{backgroundColor:colors.white, marginTop: 240}}>
                <View style={styles.firstDetail}>
                    <View style={{flex: 1}}>
                        <Heading fontSize={18}>{job.name}</Heading>
                        <View style={{flexDirection: 'row', alignItems:'center'}}>
                            <Label fontSize={12} >{`Públicado por ${getNameFormatLowerCase(job.worker)}`}</Label>
                        </View>
                        <Ranking />
                    </View>
                    
                </View>

                
                
                <View style={{paddingHorizontal: 20, paddingBottom: 10}}>
                    <View style={{flexDirection: 'row', alignItems: 'center', marginTop: 10}}>
                        <Image source={images.volumenIcon.money} style={{width: 24, height: 24}} resizeMode="contain" />    
                        <Label fontSize={16} style={{marginLeft: 5}}>Precio:</Label>
                        <Heading fontSize={18} color={colors.mainColor} style={{marginLeft: 5}}>{moneyFormat(job.amount)}</Heading> 
                        {job.measure !=='Precio unico' && <Label fontSize={16} style={{marginLeft: 5}}>{`Por ${job.measure}`}</Label>}
                    </View>
                </View>
               
                {job.aproach.length === 1 && (
                     <View style={{paddingHorizontal: 20, paddingVertical: 5}}>
                     <Label fontSize={12}>{`Este servicio solo esta disponible ${job.aproach[0]}`}</Label>
                 </View>
                )}

                <View style={styles.description_container}>
                    <Label>{job.description}</Label>
                </View>

            
                   
                {(user.userId !== job.worker.userId) && (
                    <>
                    <View style={{padding: 10, marginTop: 20}}>
                    
                    <SemiHeading>Solicitar este servicio</SemiHeading>
                    
                    <View style={{padding: 10}}>
                        <AddressInput />
                    </View>

                    {!enabledService && (
                        <View style={{padding: 10, flex: 1, flexWrap:'wrap', alignItems:'flex-start', justifyContent:'flex-start', flexDirection: 'row'}}>
                            <Label>Este servicio no esta disponible en tu dirección</Label>
                            <TouchableOpacity onPress={() => {
                                 navigation.navigate('EnabledDistricts', { list: job.districts})
                            }}>
                                <Label color={colors.mainColor}>Ver disponibilidad</Label>
                            </TouchableOpacity>
                        </View>
                    )}

                     {job.aproach.length > 1 && (
                         <PickerButton
                         label={'Tipo de servicio'}
                         data={job.aproach}
                         value={aproach}
                         onChange={(value) => {
                             setAproach(value)
                         }}
                         placeHolder="Seleccionar tipo"
                         style={{ marginTop: 10}}
                     />
                     )}


                    {job.measure !=='Precio unico' && 
                        (
                        <>
                        <InputBigNumber
                            label="Cantidad"
                            text={amount}
                            onChange={setAmount}
                            style={{flex: 1}}
                            fontSize={30}
                            isMoney={false}
                            placeholder="0"
                        />
                        <Label color={colors.text.title} style={{marginTop: 10, marginLeft: 10}}>{`Presupuesto: ${moneyFormat(budget)}`}</Label>
                        </>
                    )}

<InputText
                        label="Comentario"
                        placeholder="ej: Puedo llegar a primera hora"
                        multiline={true}
                        text={description}
                        onChange={setDescription}
                        style={{marginTop: 10}}
                        height={140}
                    />
                        <View style={{flex: 1, flexDirection: 'column'}}>
                            <DatePickerButton 
                                trigger={trigger} 
                                style={{flex: 1}} 
                                isBetween={isBetween} 
                                date={fromDate}
                                fromDate={fromDate}
                                toDate={toDate} 
                                label="Fecha" 
                                onChange={({ startDay, endDay})=>{
                                    setFromDate(startDay)
                                    setToDate(endDay)
                                }} />
                            <View style={{flex: 1, padding: 10,flexDirection: 'row', alignItems:'center'}}>
                            <Label style={{flex: 1, textAlign:'center', marginTop: 10}}>Quiero Seleccionar Un Rango</Label>
                            <Switch
                                trackColor={{ false: colors.gray, true: colors.mainColor }}
                                onValueChange={toggleSwitch2}
                                style={{marginLeft: 10}}
                                value={isBetween}
                            />
                    </View>
                        </View>
                        <View style={{flex: 1, flexDirection: 'row'}}>
                            <DatePickerButton  
                                date={fromTime} 
                                label={isBetweenHour ? 'Entre las' : 'Hora'} 
                                mode="time" 
                                style={{flex: 1, marginTop: 10}} 
                                onChange={({ date})=>{ 
                                    setFromTime(date)
                                }} 
                            />
                            {isBetweenHour && (
                                <DatePickerButton 
                                    date={toTime} 
                                    label="y las" 
                                    mode="time" 
                                    style={{flex: 1, marginTop: 10}} 
                                    onChange={({ date})=>{ 
                                        setToTime(date)
                                    }} 
                                />
                            )}
                            
                        </View>
                        <View style={{flex: 1, padding: 10,flexDirection: 'row', alignItems:'center'}}>
                            <Label style={{flex: 1, textAlign:'center', marginTop: 10}}>Quiero Seleccionar Un Rango</Label>
                            <Switch
                                trackColor={{ false: colors.gray, true: colors.mainColor }}
                                onValueChange={toggleSwitch3}
                                style={{marginLeft: 10}}
                                value={isBetweenHour}
                            />
                    </View>
                </View>
             
                <View style={{padding: 20, paddingBottom: 40, flexDirection:'row', justifyContent: 'center'}}>
                    <ActionButton
                        text="Realizar Oferta"
                        isDisabled={description === '' || !enabledService}
                        onPress={sendBid}
                        style={{flex: 1}}
                        />
                </View>
                </>
                )}

              </View>
            </View>
        </ScrollView>       
        <Animated.View style={{flex: 1, width:'100%', alignSelf:'baseline', position: 'absolute', top:0, width: '100%', opacity: headerOpacity}}>
            <Header title={job.name} hideBackButton={true} />
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
        marginTop: 10
    
    },
    spinnerTextStyle: {
        color: '#FFF'
    },
})

export default ServiceDetailScreen