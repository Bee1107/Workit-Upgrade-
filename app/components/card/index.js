

import React from 'react'
import { View, StyleSheet } from 'react-native'
// import PropTypes from 'prop-types'
import colors from '../../utils/colors'

const Card = props => {
    
    const { children, curve, style, backgroundColor, padding } = props

    return (   
        <View style={[styles.card, { borderRadius: curve ? 10 : 0 }, { backgroundColor, padding }, style]}>
            {children}
        </View>
    )
}

// Card.propTypes = {
//     children: PropTypes.node,
//     curve: PropTypes.bool,
//     style: PropTypes.object,
//     backgroundColor: PropTypes.string,
//     padding: PropTypes.number
// }
 
Card.defaultProps = {
    curve: true,
    backgroundColor: colors.white,
    style: {},
    padding: 10
}


const styles = StyleSheet.create({
    card:{
        width: '100%',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        alignSelf:'baseline',
    }
})

export default Card