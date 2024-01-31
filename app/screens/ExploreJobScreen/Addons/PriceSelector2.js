
import React, { useState, } from 'react'
import { View, StyleSheet, Image , TouchableOpacity } from 'react-native'
import colors from '../../../utils/colors'
import Label from '../../../components/text/Label'
import { moneyFormat } from '../../../utils/number'
import { images } from '../../../assets'

const ItemPrice = ({  count=1, onPress, selected }) => {

    const selectedStyle = selected === count -1 ? styles.indicatorContainerSelected : {}
    const tintColor = selected === count -1  ?  colors.white : colors.mainColor

    const onPressMe = () => {
        if(selected === count -1){
            onPress(0)
        } else {
            onPress(count)
        }
    }

    return (
        <TouchableOpacity onPress={onPressMe} style={[styles.indicatorContainer, selectedStyle]}>
            {Array.apply(null, Array(count)).map((e,index) => (
                <Image 
                    key={`index_${index}`} 
                    source={images.moneySignal} 
                    style={{width:16, height:16, tintColor}} 
                    resizeMode="contain" />
            ))}
           
        </TouchableOpacity>
    )
}

const prices = [20000,50000,100000]

const PriceSelector = ({ onChange, currentValue = -1 }) => {

    const [price, setPrice] = useState(currentValue)
 

    return (
        <View>
            <View style={styles.container}>
                <View style={styles.labels}>
                    {Array.apply(null, Array(prices.length)).map((e, index) => (
                        <ItemPrice 
                            key={`index_${index}`}  
                            count={index + 1}
                            selected={price}
                            onPress={(index) => {
                                
                                if(index === 0){
                                    setPrice(- 1)
                                    onChange(0)
                                } else {
                                    setPrice(index - 1)
                                    onChange(prices[index - 1])
                                }
                               
                            }}
                            />
                    ))} 
                </View>
            </View>
            <View style={{alignItems: 'center', justifyContent:'center', flex: 1, paddingBottom: 10}}>
                {price === -1 && (
                    <Label color={colors.mainColor}>Desde cualquier precio</Label>
                )}
                {price !== -1 && (
                    <Label color={colors.mainColor}>{`Desde ${moneyFormat(prices[price])}`}</Label>
                )}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 20,
        paddingTop: 10,
        paddingBottom: 0,
        justifyContent: 'flex-end',

    },
    labels:{
        flexDirection:'row',
        justifyContent: 'space-between',
        marginBottom: 6
    },
    indicatorContainer:{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: colors.mainColor,
        borderRadius: 25,
        width: 50,
        height: 50,
        padding: 5,
        backgroundColor: 'white'
    },
    indicatorContainerSelected:{
        borderColor: 'white',
        backgroundColor: colors.mainColor
    }
})

export default PriceSelector