import React from 'react'
import { View, StyleSheet, Text } from 'react-native'
import { daysLetter } from '../../utils/date'
import Label from '../../components/text/Label'


const ContributionGraph = ({values, numDays=10, maxDate}) => {

  
    const weeks = Math.ceil(numDays / 7)
    const max =  values.map(({count}) => count).reduce((a,c) => Math.max(a,c),0)
    const map = values.map(e => ({...e, diff: 90 - Math.ceil((maxDate.getTime() - e.date.getTime()) / 86400000) })).reduce((a,c) => ({...a, [c.diff]:c}), {})
    

    return (
        <View style={styles.container}>
            <View>
                     {Array.apply(null, Array(7)).map((e, index) => {
                        return (
                       
                            <View>
                                <Label fontSize={12}>{daysLetter[index]}</Label>
                            </View>
                        
                         
                        )
                    })}
        </View>
         {Array.apply(null, Array(weeks)).map((e0, index0) => {
             return (
                 <View>
                     {Array.apply(null, Array(7)).map((e, index) => {
                        return (
                            <>
                            {map[`${7 * index0 + index}`] && <View style={[styles.item, {backgroundColor:'#FF4E50',opacity: 0.3 + 0.7*map[`${7 * index0 + index}`].count / max}]} />}
                            {!map[`${7 * index0 + index}`] && <View style={styles.item} />}
                            </>
                        )
                    })}
                </View>
             )
         })}

       
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    itemRow:{

    },
    item:{
        width: 20,
        height: 20,
        backgroundColor: '#FF4E50',
        marginTop: 5,
        opacity: 0.1
    }
})

export default ContributionGraph