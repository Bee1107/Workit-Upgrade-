import React, { useRef } from 'react'
import { View, StyleSheet, FlatList } from 'react-native'
import colors from '../../utils/colors'
import CalendarCard  from '../../components/CalendarCard'
import { useNavigation } from '@react-navigation/native'
import { months, dateFixed } from '../../utils/date'

const CalendarDetailScreen = ( { route }) =>{ 

    const navigation = useNavigation()
    const list = useRef(null)
    const calendar = route.params

    const goDetail = job => {
        navigation.navigate('RunningJob', { screen:'CurrentJob', params:{ job: job[0] } })
    }

    const renderItem = ({item})=> {

        const date = dateFixed(new Date(item.job_time))
        
        return (
            <CalendarCard 
                index={date.getDate() - 1} 
                isPast={date.getTime() < Date.now()}
                month={months[date.getMonth()]}
                item={[item]} onPress={goDetail} />
        )
    }

    return (
        <View style={styles.container}>
            
            <FlatList
                ref={list}
                data={calendar.sort((a,b) => a.toTime > b.toTime)}
                renderItem={renderItem}
                keyExtractor={(item,index) => `calendar_${index}`}
                style={{flex: 1}}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor: colors.white,
    },
})


export default CalendarDetailScreen