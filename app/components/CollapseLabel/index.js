import React, { useState } from 'react'
import { View, TouchableOpacity, StyleSheet} from 'react-native'
import Label from '../text/Label'
import colors from '../../utils/colors'

const CollapseLabel = ({ text, max = 200, style = {} }) => {

    const [collapse, setCollapse] = useState(text.length >= max)
    return (
        <View style={[{ alignSelf:'stretch'}, style]}>
             <Label>{collapse ? `${text.substring(0, Math.min(text.length, 200))}...`: text}</Label>
            {text.length >= 200 && ( <View style={styles.bottom}>
                <TouchableOpacity onPress={()=>{
                    setCollapse(!collapse)
                }}>
                    <Label color={colors.mainColor}>{collapse ? 'Ver más' : 'Ver menos'}</Label>
                </TouchableOpacity>
                </View>)}
        </View>
    )
}

const styles = StyleSheet.create({
    bottom:{
        flex: 1,
        flexDirection:'row',
        justifyContent: 'flex-end',
        marginTop: 10,
    }
})

export default CollapseLabel