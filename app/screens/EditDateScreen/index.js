import React, { useState} from 'react'
import { View, StyleSheet , StatusBar } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import ActionButton from '../../components/ActionButton'
import { SafeAreaView } from 'react-native-safe-area-context'
import DatePickerButton from '../../components/Picker/DatePickerButton'
import colors from '../../utils/colors'
import { useDispatch } from 'react-redux'
import { actions } from '../../redux/action'

const { POST } = actions('job.edit.date')

const EditDateScreen = ({route}) => {

    const [fromDate, setFromDate] = useState(new Date())
    const [fromTime, setFromTime] = useState(new Date())

    const dispatch = useDispatch()

    const onPress = () => {
     
        dispatch({
            type: POST.START,
            data:{
                fromDate,
                fromTime,
                job: route.params.jobDetail
            }
        })
 
    }
   
    return (   
        <SafeAreaView style={styles.container} edges={['right', 'bottom', 'left']} >
      
            <View style={{flex: 1}}>
                <DatePickerButton 

                    date={fromDate}
                    fromDate={fromDate}
                    label="Fecha" 
                    onChange={({ date})=>{
                        setFromDate(date)
                    }} />

                <DatePickerButton  
                    date={fromTime} 
                    label="Hora"
                    mode="time" 
                    style={{flex: 1, marginTop: 10}} 
                    onChange={({ date})=>{ 
                        setFromTime(date)
                    }} 
                />
            </View>
            <ActionButton 
              
                text="ACEPTAR" 
                onPress={onPress} 
            />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
  
    container: {
        flex: 1,
        backgroundColor: colors.white,
        padding: 20,
        justifyContent: 'space-between',
    },
   
    spinnerTextStyle: {
        color: '#FFF'
    },
   
})

export default EditDateScreen