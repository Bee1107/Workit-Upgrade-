

import React from 'react'
import { StyleSheet, TouchableOpacity, Image, View } from 'react-native'
import Label from '../text/Label'
// import PropTypes from 'deprecated-react-native-prop-types'
import Colors from '../../utils/colors'


const CustomButton = props => {

    const { onPress, title, icon, secondIcon, style, backgroundColor, disabled, buttonStyle, alignLabel, fontSize } = props
    const diabledStyle = disabled ? styles.disabled : {}

    const getMainStyle = () => {
        if(buttonStyle === 'normal'){
            return styles.button
        } else if(buttonStyle === 'danger'){
            return styles.buttonDanger
        }

        return styles.buttonClear
    }

    const getColorLabel = () => {
       
        if(buttonStyle === 'normal'){
            return Colors.white
        } else if(buttonStyle === 'danger'){
            return Colors.dangerColor
        }

        return Colors.mainColor

    }

    const getBackgroundColor = () => {
        if(buttonStyle === 'danger'){
            return Colors.white
        }

        return backgroundColor

    }

    return (
        <TouchableOpacity disabled={disabled}  onPress={onPress} style={[getMainStyle(), style, { backgroundColor:getBackgroundColor() }, diabledStyle]}>
            {icon && <Image source={icon} style={styles.icon} resizeMode="contain" />}
            <View style={{flex: 1}}>
                <Label fontSize={fontSize} style={{ alignSelf: alignLabel}} color={getColorLabel()} >{title}</Label>
            </View>
            {secondIcon && <Image source={secondIcon} style={styles.secondIcon} resizeMode="contain" />}
        </TouchableOpacity>
    )

}

const styles = StyleSheet.create({
   button: {
    borderRadius: 10,
    padding: 15,
    flexDirection: 'row',
    alignItems: 'center'
   },
   buttonClear:{
    padding: 15,
    flexDirection: 'row',
    alignItems: 'center'
   },
   buttonDanger:{
    borderRadius: 10,
    padding: 15,
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: Colors.dangerColor,
    borderWidth:1
   },
   icon:{
       width: 24,
       height: 24,
       marginRight: 10,
       alignSelf: 'flex-start'
   },
   secondIcon:{
        width: 16,
        height: 16,
        alignSelf: 'flex-start'
    },
   disabled:{
       backgroundColor:'#DEDEDE',
       opacity: 0.4
   }
})


// CustomButton.propTypes = {
//     title: PropTypes.string,
//     onPress: PropTypes.func,
//     icon: PropTypes.node,
//     secondIcon: PropTypes.node,
//     style: PropTypes.object,
//     backgroundColor: PropTypes.string,
//     disabled: PropTypes.bool,
//     buttonStyle: PropTypes.oneOf(['normal', 'clear']),
//     alignLabel: PropTypes.string,
//     fontSize: PropTypes.number

// }
 
CustomButton.defaultProps = {
    title: '',
    onPress: () => {},
    style: {},
    backgroundColor: Colors.mainColor, 
    disabled: false,
    buttonStyle: 'normal',
    alignLabel: 'center',
    fontSize: 20
}


export default CustomButton