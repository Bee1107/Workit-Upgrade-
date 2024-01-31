import React from 'react'
import { View, StyleSheet, TouchableOpacity, Image } from 'react-native'
import { images } from '../../assets'
import Label from '../../components/text/Label'
import colors from '../../utils/colors'


const Chip = ({ text, items, onToggle }) => {

    const isSelect = items.includes(text)

    return (
        <TouchableOpacity onPress={onToggle} style={[styles.chip, isSelect ? styles.chipSelected : styles.chipUnselected]}>
            <Label color={isSelect?'white':'gray'}>{text}</Label>
            <Image source={isSelect ? images.checkChip : images.plusChip} style={[styles.check, { tintColor: isSelect ? 'white': colors.gray}]}  resizeMode="contain" />
        </TouchableOpacity>
    )
}

const ChipSelector = ({ 
    label,
    style={},
    data=[],
    selected=[],
    onSelected,
}) => {

    return (   
        <View style={[styles.container, style]}>
           {label && <Label color={colors.mainColor} style={styles.label}>{label}</Label>}
           <View style={[styles.chipContainer, {marginTop: (label) ? 25 : 0}]}>
                {data && data.map((item, index)=> (
                        <Chip 
                        key={`key_${index}`}
                        text={item} 
                        items={selected}
                        onToggle={() => {
                            if(selected.includes(item)){
                                onSelected(selected.filter(e => e !== item))
                            } else {
                                onSelected([...selected, item])
                            }
                        }}
                        />
                    ))}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 5,
    },
   
    label:{
        position:'absolute',
        left: 20,
        backgroundColor: colors.white,
        zIndex: 9999,
        paddingHorizontal: 5
    },
    chipContainer:{
        flexDirection:'row',
        flexWrap:'wrap',
        justifyContent:'flex-start',
    },
    chip:{
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 8,
        margin: 4,
        flexDirection:'row',
        justifyContent: 'space-between',
        alignItems:'center'
    },
    chipSelected:{
        backgroundColor: colors.mainColor
    },
    chipUnselected:{
        backgroundColor: colors.grayLigth
    },
    check:{
        width: 20,
        height: 20,
        marginLeft: 10
    }
})

export default ChipSelector