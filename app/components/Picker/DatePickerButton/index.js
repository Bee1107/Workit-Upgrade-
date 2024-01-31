import React, { useState, useEffect, useRef } from 'react'
import { View, Modal, StyleSheet, TouchableOpacity,Easing, Animated, Image, Platform, Dimensions } from 'react-native'
import ActionButton from '../../../components/ActionButton'
import Label from '../../../components/text/Label'
import colors from '../../../utils/colors'
import { dateToHumanFormat, dateToHumanFormat2, timeToHumanFormat } from '../../../utils/date' 
import { SafeAreaView } from 'react-native-safe-area-context'
import DatePicker from 'react-native-date-picker'
import { images } from '../../../assets'
import { Calendar } from 'react-native-calendars'
import { dateFixed } from '../../../utils/date'

const DAY_MILI = 1000 * 3600 * 24
const today = new Date()
const windowWidth = Dimensions.get('window').width

const DatePickerButton = ({ 
    label, 
    placeHolder,
    date = new Date(),
    fromDate = new Date(),
    toDate = new Date(),
    onChange = () => {},
    style ={},
    mode = 'date',
    isBetween = false,
    trigger = false,
    minimumDate = new Date()
}) => {

    const valueString = value => (value<10) ? `0${value}` : `${value}`

    const [visible, setVisible] = useState(false)
    const [dateStr, setDateStr] = useState('')

    const [markedDates, setMarkedDates] = useState({})

    const [localDate, setLocalDate] = useState(date)
    const [startDay, setStartDay] = useState(fromDate)
    const [endDay, setEndDay] = useState(toDate)
    
    const position = useRef(new Animated.Value(-400)).current

    useEffect(() => {
        if(trigger){
            openPicker()
        } else {
            setLocalDate(startDay)
            onChange({
                date: startDay,
                startDay,
                endDay:startDay,
            })
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


        setMarkedDates(objDate)
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

        if(!isBetween){ 
            if(mode === 'date'){           
                setDateStr(dateToHumanFormat(localDate))
            } else {
                setDateStr(timeToHumanFormat(date))
            }
        } else {
            if(startDay && endDay){
                setDateStr(`${dateToHumanFormat2(startDay)} - ${dateToHumanFormat2(endDay)}`)
            }
        }
        
    }, [date, localDate, isBetween])


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

    const onDayPress = ({year, day, month}) => {
        const date =  new Date(year,month - 1,day)
        date.setHours(date.getHours() + 3)

        if(startDay === undefined){
            setStartDay(date)
        } else if(endDay === undefined){
            setEndDay(date)
        } else {
            setStartDay(date)
            setEndDay(undefined)
        }

    }
    

    const showCalendar = () => (
        <Calendar
            minDate={`${today.getFullYear()}-${valueString(today.getMonth() + 1)}-${valueString(today.getDate())}`}
            onDayPress={onDayPress}
            hideExtraDays={false}
            firstDay={1}
            disableAllTouchEventsForDisabledDays={true}
            markingType={'period'}
            markedDates={markedDates}
            style={{width: windowWidth - 20, backgroundColor: colors.white}}
            theme={{
                backgroundColor: colors.white,
                calendarBackground: colors.white,
                monthTextColor: colors.black,
                indicatorColor: colors.white,
                textSectionTitleColor: '#b6c1cd',
                textSectionTitleDisabledColor: '#d9e1e8',
                selectedDayBackgroundColor: '#00adf5',
                selectedDayTextColor: '#ffffff',
                todayTextColor: '#00adf5',
                dayTextColor: '#2d4150',
                textDisabledColor: '#d9e1e8',
                dotColor: '#00adf5',
                selectedDotColor: '#ffffff',
                arrowColor: 'orange',
                disabledArrowColor: '#d9e1e8',
                textDayFontWeight: '300',
                textMonthFontWeight: 'bold',
                textDayHeaderFontWeight: '300',
                textDayFontSize: 16,
                textMonthFontSize: 16,
                textDayHeaderFontSize: 16
              }}
        />
    )

    return (   
        <>
            <Modal
                animationType="fade"
                transparent={true}
                visible={visible}
                onRequestClose={() => {}}
                statusBarTranslucent={true}
                >
                <View style={styles.modal}>
                    <Animated.View style={{bottom: position}}>
                        <SafeAreaView style={styles.bottomView} edges={['right', 'bottom', 'left']}>
                           {!isBetween && (
                               <DatePicker
                                    date={localDate}
                                    onDateChange={date => {
                                        
                                        setLocalDate(date)
                                        setStartDay(dateFixed(date))
                                        setEndDay(dateFixed(date))
                                    }}
                                    mode={mode}
                                    style={{width: windowWidth}}
                                    {...((mode === 'date') ? {minimumDate } : {})}
                                    />
                           )}

                           {isBetween && showCalendar()}
                             
                            <ActionButton
                                text="Aceptar"
                                style={styles.button}
                                onPress={onAcept}
                            />
                        </SafeAreaView>
                    </Animated.View>
                </View>
            </Modal>
        <View style={[styles.container, style]}>
            {label && <Label color={colors.mainColor} style={styles.label}>{label}</Label>}
            <TouchableOpacity onPress={openPicker}  style={styles.input}>
               <Label color={colors.black}>{(dateStr !=='') ? dateStr : placeHolder}</Label>
               <Image source={images.arrowDropDown} style={styles.icon} />
            </TouchableOpacity>
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
    input:{
        marginTop: 5,
        height: 50, 
        paddingHorizontal: 10,
        flexDirection:'row',
        backgroundColor: colors.white,
        alignItems:'center',
        borderColor: '#CCC', 
        borderRadius: 10,
        borderWidth: 1,
        justifyContent:'space-between',
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
    button: {
        borderRadius: 6,
        marginTop: 20,
        marginHorizontal: 10,
        marginBottom: Platform.OS === 'ios' ? 0 : 20
    },
    pickerItem: {
        flex: 1, 
        justifyContent:'center', 
        paddingVertical: 12,
        paddingHorizontal: 12
    },
    pickerItemSelected: { 
        backgroundColor:colors.winterWhite, 
        borderRadius: 10
    },

    label:{
        position:'absolute',
        left: 20,
        backgroundColor: colors.white,
        zIndex: 9999,
        paddingHorizontal: 5
    },
    icon: {
        width: 15,
        height: 10,
        tintColor: colors.grayLigth,
    }
})

export default DatePickerButton