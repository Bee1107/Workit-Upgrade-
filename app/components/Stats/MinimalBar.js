import React from 'react'
import { View, StyleSheet } from 'react-native'
import colors from '../../utils/colors'
import Label from '../../components/text/Label'
import SemiHeading from '../text/SemiHeading'

const MinimalBar = ({data, color = '#EB3349', prefix='', suffix = () => '', factor=1}) => {

    const max = data.reduce((a, { value }) => Math.max(a, value), Number.MIN_VALUE)

    return (
        <View style={styles.container}>
           { data.map( v => ({...v, value: v.value * 140  / (Math.max(max, 1.0))})).map((e, index) => (
               <View key={`key_${index}`} style={{alignItems:'center'}}>
                    <SemiHeading>{`${prefix}${(data[index].value * factor).toFixed()}${suffix(data[index].value)}`}</SemiHeading>
                    <View style={styles.bar}>
                        {data[index].value > 0 && <View style={{
                            borderColor: color,
                            borderWidth: 4, 
                            width: 4, 
                            height: e.value, 
                            borderRadius: 4, 
                            backgroundColor: color,
                            marginLeft: -2
                            }} />
                        }
                    </View>
                    <Label>{e.label}</Label>
               </View>
           ))}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    bar: {
        backgroundColor: colors.winterWhite,
        height: 140, 
        width: 4, 
        borderRadius: 2,
        justifyContent: 'flex-end',
        marginTop: 5
    }
})

export default MinimalBar