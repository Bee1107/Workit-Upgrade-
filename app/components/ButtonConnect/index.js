

import React from 'react'
import { StyleSheet, TouchableOpacity, Image, View } from 'react-native'
import Label from '../text/Label'
// import PropTypes from 'deprecated-react-native-prop-types'
import Colors from '../../utils/colors'


const ButtonConnect = props => {

    const { onPress, title, icon, secondIcon , style, isTransparent} = props
    const backgroundColor = isTransparent ?  Colors.buttons.whiteTransparent : Colors.white

    return (
        <TouchableOpacity onPress={onPress} style={[styles.button, style, { backgroundColor }]}>
            {icon && <Image source={icon} style={styles.icon} resizeMode="contain" />}
            <View style={{flex: 1}}>
                <Label color={Colors.black} fontSize={15} style={{ alignSelf: 'center'}}  >{title}</Label>
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
    alignItems: 'center',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Colors.grayLigth
   },
   icon:{
       width: 20,
       height: 20,
       marginRight: 10,
       tintColor: Colors.black
   },
   secondIcon:{
        width: 16,
        height: 16,
        alignSelf: 'flex-start'
    }
})


// ButtonConnect.propTypes = {
//     title: PropTypes.string,
//     onPress: PropTypes.func,
//     icon: PropTypes.node,
//     secondIcon: PropTypes.node,
//     style: PropTypes.object,
//     backgroundColor: PropTypes.string,
// }
 
ButtonConnect.defaultProps = {
    title: '',
    onPress: () => {},
    style: {},
    backgroundColor: Colors.white, 
}


export default ButtonConnect