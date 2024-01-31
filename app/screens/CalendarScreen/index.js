import React, { useEffect, useState, useRef } from 'react'
import { View, StyleSheet, FlatList } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import colors from '../../utils/colors'
import CalendarDatePickerButton from '../../components/Picker/CalendarDatePickerButton'
import { useSelector, useDispatch } from 'react-redux'
import { get } from '../../redux/action'
import CalendarCard from '../../components/CalendarCard'
import { getFixedNow } from '../../utils/date'

const monthDays = [31,28,31,30,31,30,31,31,30,31,30,31]
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

const CalendarScreen = () =>{ 

    const navigation = useNavigation()

    const [fromDate, setFromDate] = useState(new Date())
    const [isPast, setIsPast] = useState(false)
    const [isFuture, setFuture] = useState(false)
    const dispatch = useDispatch()
    const list = useRef(null)
    const calendar = useSelector(state => state.calendar.list) 

    const getCalendarJobs = (date = new Date()) => {
        dispatch(
            get('calendarJobs', { date: date.getTime()})
        )
    }

    useEffect(() => {

        const now = new Date()
        const currentFromDate = fromDate
        currentFromDate.setMinutes(0)
        currentFromDate.setMilliseconds(0)
        currentFromDate.setHours(0)
        currentFromDate.setSeconds(0)
        const currentFromTime = currentFromDate.getTime() - currentFromDate.getTimezoneOffset() * 60 * 1000
        const currentIsPast = getFixedNow() > currentFromTime

        if(!currentIsPast){
            setFuture(fromDate.getFullYear() >=  now.getFullYear() && fromDate.getMonth() > now.getMonth())
        }

        setIsPast(currentIsPast)
    }, [fromDate])

    useEffect(() => {
        getCalendarJobs()
    }, [])

    useEffect(() => {
        
  
        if(list.current !== null){
            const now = new Date().getDate() - 1
            const index = list.current !== null && !isFuture && !isPast ? now : 0
          
            setTimeout(() =>{
                list.current.scrollToIndex({index})
            }, Platform.OS == 'ios' ? 600 : 1200)
        } 

   
       
    }, [calendar])


    const goDetail = job => {
        
        if(job.length === 1){
            navigation.navigate('RunningJob', { screen:'CurrentJob', params:{ job: job[0] } })
        } else if(job.length > 1) {
            navigation.navigate('CalendarDetail', job)
        }
  
    }

    const onChangeCalendar = ({ date })=>{
        const copiedDate = new Date(date.getTime())
        copiedDate.setDate(1)
        setFromDate(copiedDate)
        getCalendarJobs(copiedDate)
    }

    const renderItem = ({item})=> {

        const data = calendar.find(e=>e.date === `${item}`)
 
        return (
            <CalendarCard 
                index={item} 
                month={months[fromDate.getMonth()].short}
                isPast={isPast}
                isFuture={isFuture}
                item={data ? data.data : []} onPress={goDetail} />
        )
    }

    return (
        <View style={styles.container}>
           <View style={styles.header}>
                <CalendarDatePickerButton 
                    date={fromDate}
                    fromDate={fromDate}
                    label="Fecha" 
                    onChange={onChangeCalendar} />
           </View>
            <FlatList
                ref={list}
                data={Array.from({length: monthDays[fromDate.getMonth()]}).map((a,index)=>index)}
                renderItem={renderItem}
                keyExtractor={(item, index) => `calendar_${index}`}
                style={{flex: 1}}
                scrollEventThrottle={20}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor: colors.white,
    },
    header: {
        padding: 20
    }
})


export default CalendarScreen