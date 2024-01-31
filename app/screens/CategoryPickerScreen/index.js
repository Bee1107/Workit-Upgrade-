import React from 'react'
import { StyleSheet  } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { SafeAreaView } from 'react-native-safe-area-context'
import CategoryPanel from '../../components/CategoryPanel'
import colors from '../../utils/colors'

const PrincipalScreen = ({ route }) => {

    const navigation = useNavigation()

    const callback = route.params.callback

    const onPress = category => {
        callback({
            category,
            subcategory: undefined
        })
        navigation.goBack(null)
    }
   
    return (   
        <SafeAreaView style={styles.container} edges={['right', 'bottom', 'left']} >
            <CategoryPanel 
                onPress={onPress}
            />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white,
        justifyContent: 'space-between',
    },
   
})

export default PrincipalScreen