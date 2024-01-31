import React, { useState, useEffect } from 'react'
import { View, StyleSheet , StatusBar, Switch} from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import ActionButton from '../../../components/ActionButton'
import { ScrollView } from 'react-native-gesture-handler'
import InputBigNumber from '../../../components/InputBigNumber'
import { SafeAreaView } from 'react-native-safe-area-context'
import Wizard from '../Addons/wizard'
import Label from '../../../components/text/Label'
import Heading from '../../../components/text/Heading'
import colors from '../../../utils/colors'
import DatePickerButton from '../../../components/Picker/DatePickerButton'
import { stringToInt } from '../../../utils/number'
import Spinner from 'react-native-loading-spinner-overlay'
import { dateFixed, sameDay, dateInverse, nextDay } from '../../../utils/date'

const now = new Date()

const nowNextTwoHours = new Date()
nowNextTwoHours.setHours(nowNextTwoHours.getHours() + 2)

const nowNextThreeHours = new Date()
nowNextThreeHours.setHours(nowNextThreeHours.getHours() + 3)

const SignupScreen = ({post, push, isLoading}) => {

    
    const [amount, setAmount] = useState('')
    
    const [fromDate, setFromDate] = useState(now.getHours() >= 22 ? nextDay() : now)
    const [toDate, setToDate] = useState(now.getHours() >= 22 ? nextDay() : now)
    
    const [fromTime, setFromTime] = useState(dateInverse(nowNextTwoHours))
    const [toTime, setToTime] = useState(dateInverse(nowNextThreeHours))

    const [workerPrice, setWorkerPrice] = useState(false)
    const [isBetween, setIsBetween] = useState(false)
    const [isBetweenHour, setIsBetweenHour] = useState(false)
    const [trigger, setTrigger] = useState(false)


    useEffect(() => {

        if(sameDay(dateFixed(new Date()), fromDate)){
            setFromTime(nowNextTwoHours)
            setToTime(nowNextThreeHours)
        }

        if(toDate){
            if(fromDate.getTime() > toDate.getTime()){
                const currentFromDate = fromDate
                setFromDate(now)
                setToDate(currentFromDate)
            }
        }
        
    }, [fromDate, toDate])

    useEffect(() => {
        setTrigger(isBetween)
    }, [isBetween])

    useEffect(() => {
        if(isBetweenHour && fromTime.getTime() >= toTime.getTime()){
            setToTime(new Date(fromTime.getTime()))
            setFromTime(new Date(toTime.getTime()))
        }
    }, [fromTime, toTime])

    const onChangeFromTime = ({ date})=>{ 

        if(sameDay(dateFixed(new Date()), fromDate)){
           
            const nowNextTwoHours = dateFixed(new Date())
            nowNextTwoHours.setHours(nowNextTwoHours.getHours() + 2)

            const nowNextThreeHours = dateFixed(new Date())
            nowNextThreeHours.setHours(nowNextThreeHours.getHours() + 3)

            if(date.getTime() <= nowNextTwoHours.getTime()){
                setFromTime(dateInverse(nowNextTwoHours))
                setToTime(dateInverse(nowNextThreeHours))
            } else {
                setFromTime(date)
            }
        } else {
            setFromTime(date)
        }
    }

    const toggleSwitch = () => setWorkerPrice(previousState => !previousState)
    const toggleSwitch2 = () => setIsBetween(previousState => !previousState)
    const toggleSwitch3 = () => setIsBetweenHour(previousState => !previousState)
    
    const onSubmit = () => {

        push({
            amount: stringToInt(amount),
            fromDate,
            toDate,
            fromTime,
            toTime,
            isBetween,
            isBetweenHour
        })
        post()
    }

    const getDisabled = () => {
        if(!workerPrice && (amount === '' || amount === '$')){
            return true
        }

        return false
    }

    return (   
        <KeyboardAwareScrollView
            resetScrollToCoords={{ x: 0, y: 0 }}
            contentContainerStyle={styles.container}
            extraHeight={140}
            scrollEnabled={false}>
            <Spinner
                visible={isLoading}
                textContent={'Publicando'}
                textStyle={styles.spinnerTextStyle}
                />
            <SafeAreaView style={styles.container} edges={['right', 'bottom', 'left']} >
            <Wizard step={2} />

            <ScrollView>
                <View style={{padding: 20}}>
                   
                    {!workerPrice && (
                        <InputBigNumber
                            label="Precio"
                            text={amount}
                            onChange={setAmount}
                        />
                    )}

                    {workerPrice && (
                        <View style={{flex: 1, alignItems: 'center', marginTop: 8}}>
                            <Heading color={colors.mainColor} fontSize={40}>$?</Heading>
                        </View>
                    )}
                   
                    <View style={{flex: 1, padding: 10,flexDirection: 'row', alignItems:'center'}}>
                        <Label style={{flex: 1, textAlign:'center', marginTop: 10}}>No estoy seguro del precio, que lo defina el Worker</Label>
                        <Switch
                            trackColor={{ false: colors.gray, true: colors.mainColor }}
                            onValueChange={toggleSwitch}
                            style={{marginLeft: 10}}
                            value={workerPrice}
                        />
                    </View>
                   

                    <View style={{marginTop: 10}}>
                        <View style={{flex: 1, flexDirection: 'column'}}>
                            <DatePickerButton 
                                trigger={trigger} 
                                style={{flex: 1}} 
                                isBetween={isBetween} 
                                date={fromDate}
                                fromDate={fromDate}
                                toDate={toDate} 
                                label="Fecha" 
                                minimumDate={now.getHours() >= 22 ? nextDay() : now}
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
                                onChange={onChangeFromTime} 
                            />
                            {isBetweenHour && (
                                <DatePickerButton 
                                    date={toTime} 
                                    label="y las" 
                                    mode="time" 
                                    style={{flex: 1, marginTop: 10}} 
                                    onChange={({ date })=>{ 
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
                </View>
            </ScrollView>

            <View style={styles.bottomCard}>
                <ActionButton 
                    text="Publicar Servicio" 
                    style={styles.marginTop} 
                    onPress={onSubmit}
                    isDisabled={getDisabled()}
                    />
            </View>
            </SafeAreaView>
        </KeyboardAwareScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white,
        justifyContent:'space-between'
    },
    bottomCard:{
        padding: 20, 
        borderTopWidth: StyleSheet.hairlineWidth, 
        borderTopColor: '#CCC'
    },
    spinnerTextStyle: {
        color: '#FFF'
    },
    marginTop: {
        marginTop: 10
    }
})

export default SignupScreen