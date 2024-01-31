import React, { useState, useEffect, useRef } from 'react'
import { View, Modal, StyleSheet, TouchableOpacity,Easing, Animated, Image, Platform, Dimensions } from 'react-native'
import ActionButton from '../../../components/ActionButton'
import Label from '../../../components/text/Label'
import Heading from '../../../components/text/Heading'
import colors from '../../../utils/colors'
import { dateToHumanFormat, dateToHumanFormat2 } from '../../../utils/date' 
import { SafeAreaView } from 'react-native-safe-area-context'
import DatePicker from 'react-native-date-picker'
import { images } from '../../../assets'
import Card from '../../../components/card'

const DAY_MILI = 1000 * 3600 * 24
const windowWidth = Dimensions.get('window').width
const months = [
    {short:'Ene', label:'Enero'}, 
    {short:'Feb', label:'Febrero'},
    {short:'Mar', label:'Marzo'},
    {short:'Abr', label:'Abril'},
    {short:'May', label:'Mayo'},
    {short:'Jun', label:'Junio'},
    {short:'Jul', label:'Julio'},
    {short:'Ago', label:'Agosto'},
    {short:'Sep', label:'Septiembre'},
    {short:'Oct', label:'Octubre'},
    {short:'Nov', label:'Noviebre'},
    {short:'Dic', label:'Diciembre'},
]

const CalendarDatePickerButton = ({ 
    date = new Date(),
    fromDate = new Date(),
    toDate = new Date(),
    onChange = () => {},
    style ={},
    trigger = false
}) => {

    const valueString = value => (value<10) ? `0${value}` : `${value}`

    const [visible, setVisible] = useState(false)
    const [dateStr, setDateStr] = useState('')

    const [localDate, setLocalDate] = useState(date)
    const [startDay, setStartDay] = useState(fromDate)
    const [endDay, setEndDay] = useState(toDate)
    
    const position = useRef(new Animated.Value(-400)).current

    useEffect(() => {
        if(trigger){
            openPicker()
        }
    }, [trigger])


    useEffect(() => {
        const objDate = {}
 
        if(startDay !== undefined && endDay !== undefined){
            const diffTime = endDay.getTime() - startDay.getTime()
            const diffDays = diffTime / DAY_MILI + 1

           
            if(diffDays < 0){
                setStartDay(endDay)
                setEndDay(startDay)
                return
            }

            const currentNow = new Date((diffDays < 0) ? endDay.getTime() : startDay.getTime())
            currentNow.setDate(currentNow.getDate() - 1)
           
            for(let i = 0 ; i < Math.abs(diffDays); i++){
                currentNow.setDate(currentNow.getDate() + 1)
                objDate[`${currentNow.getFullYear()}-${valueString(currentNow.getMonth() + 1)}-${valueString(currentNow.getDate())}`] = {
                    startingDay: (i === 0) ? true : undefined, 
                    endingDay: (i === diffDays - 1) ? true : undefined, 
                    color: colors.mainColor, 
                    textColor: colors.white
                }
                
            }
           
            
        } else if(startDay !== undefined){
            objDate[`${startDay.getFullYear()}-${valueString(startDay.getMonth() + 1)}-${valueString(startDay.getDate())}`] = {
                startingDay: true, 
                endingDay: true, 
                color: colors.mainColor, 
                textColor: colors.white
            }
        }

        if(startDay && endDay){
            setDateStr(`${dateToHumanFormat2(startDay)} - ${dateToHumanFormat2(endDay)}`)
        }
     }, [startDay, endDay])

    
    const openPicker = () => {

        Animated.timing(position, {
            toValue: 0,
            duration: 300,
            useNativeDriver: false,
            easing: Easing.linear,
          }).start()

        setVisible(true)
    }

    useEffect(() => {
        setDateStr(dateToHumanFormat(date))
        
    }, [date])


    const onAcept = () => {

        Animated.timing(position, {
            toValue: -400,
            duration: 300,
            useNativeDriver: false,
            easing: Easing.linear
          }).start(() => {
            setVisible(false)
          })

        onChange({
            date: localDate,
            startDay,
            endDay,
        })
     
    }

    return (   
        <>
            <Modal
                animationType="fade"
                transparent={true}
                visible={visible}
                onRequestClose={() => {}}>
                <View style={styles.modal}>
                    <Animated.View style={{bottom: position}}>
                        <SafeAreaView style={styles.bottomView} edges={['right', 'bottom', 'left']}>
                    
                               <DatePicker
                                    date={localDate}
                                    onDateChange={date => {
                                        setLocalDate(date)
                                    }}
                                    mode="date"
                                    style={{width: windowWidth}}
                                    androidVariant="iosClone"
                                />
                           <View style={{paddingHorizontal: 20, width: '100%', marginBottom: Platform.OS === 'ios' ? 0 : 20}}>
                            <ActionButton
                                    text="Aceptar"
                                    onPress={onAcept}
                                    style={{width: '100%'}}
                                />
                           </View>
                           

                        </SafeAreaView>
                    </Animated.View>
                </View>
            </Modal>
        <View style={[styles.container, style]}>
            <Card padding={10}>
                <TouchableOpacity onPress={() => {
                    openPicker()
                }}>
                    <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems:'center'}}>
                        <View style={{flexDirection: 'row'}}>
                            <Image source={images.volumenIcon.calendar2} style={{width: 48, height: 48}} />
                            <View style={{marginLeft: 10}}>
                                <Label>Seleccionar fecha</Label>
                                <Heading fontSize={22}>{`${months[localDate.getMonth()].label} ${localDate.getFullYear()}`}</Heading>
                            </View>
                        </View>
                        <Image source={images.arrow.gray} style={{width: 32, height: 32, tintColor: colors.mainColor}} resizeMode="contain" />
                        
                    </View>
                </TouchableOpacity>
            </Card>
        </View>
        </>
       
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 5,
    },
    containerKeyboard: {
        flex: 1,
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
        paddingTop: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },

    label:{
        position:'absolute',
        left: 20,
        backgroundColor:'white',
        zIndex: 9999,
        paddingHorizontal: 5
    },
    icon: {
        width: 15,
        height: 10,
        tintColor: colors.grayLigth,
    }
})

export default CalendarDatePickerButton