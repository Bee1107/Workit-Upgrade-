import React from 'react'
import { View, TextInput, StyleSheet, Image } from 'react-native'
import { images } from '../../assets'
// import PropTypes from 'deprecated-react-native-prop-types'
import colors from '../../utils/colors'

const SearchInput = props => {

    const { onChange, text, placeHolder, placeholderTextColor, textColor } = props

    return (
        <View style={styles.container}>
            <Image source={images.magnifyingglass} style={styles.icon} />
            <TextInput
                style={[styles.input]}
                onChangeText={text => {
                    onChange(text)
                }}
                value={text}
                placeholder={placeHolder}
                numberOfLines={1}
                textColor={textColor}
                placeholderTextColor={placeholderTextColor}
            />
        </View>
    )
}

// SearchInput.propTypes = {
//     text: PropTypes.string,
//     placeHolder: PropTypes.string,
//     placeholderTextColor: PropTypes.string,
//     textAlign: PropTypes.string,
//     textColor: PropTypes.string,
//     onChange: PropTypes.func
//  }
 
 SearchInput.defaultProps = {
     text: '',
     placeHolder: 'Buscar',
     textAlign: 'center',
     textColor: colors.white,
     placeholderTextColor: '#CCC',
     onChange: () => {}
 }
 
 const styles = StyleSheet.create({
     container: {
         flexDirection:'row',
         backgroundColor: colors.white,
         borderRadius: 10,
         padding: 5,
         alignItems: 'center'
     },
     input:{
         height: 30, 
         flex: 1, 
         marginLeft: 10,
         fontFamily: 'Poppins-Regular',
         paddingVertical: 0
     },
     icon:{
         width: 24,
         height: 24,
         marginLeft: 10,
     }
 })

 
export default SearchInput