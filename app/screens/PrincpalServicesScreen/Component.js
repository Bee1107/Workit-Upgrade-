import React, { useState } from 'react'
import { View, StyleSheet } from 'react-native'
import CategoryPanel from '../../components/CategoryPanel'
import BigSearchInput from '../../components/BigSearchInput'
import { useNavigation } from '@react-navigation/native'
import colors from '../../utils/colors'

const PrincpalServicesScreen = () => {

    const navigation = useNavigation()
    const [isShadow, setIsShadow] = useState(false)

    const onPressItem = category => {
        navigation.navigate('PrincipalServicesFilter', { category })
    }

    const onPressSearch = () => {
        navigation.navigate('SearchService')
    }

    const onScroll = ({contentOffset: { y }}) => {
        setIsShadow(y > 0)
    }

    return (
        <View style={styles.container}>
            <View style={[styles.header, (isShadow ? styles.shadow : {})]}>
                <BigSearchInput 
                    editable={false}
                    placeHolder="Buscar Servicios o Workers"
                    onPress={onPressSearch} 
                />
            </View>
           <CategoryPanel
                onPress={onPressItem}
                onScroll={onScroll}
           />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white
    },
    header:{
        padding: 10,
        backgroundColor: colors.white,
        zIndex: 9999
    },
    shadow:{
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.27,
        shadowRadius: 4.65,
        elevation: 6,
    }
})

export default PrincpalServicesScreen