import React from 'react'
import { View, FlatList, StyleSheet } from 'react-native'
import Label from '../../components/text/Label'
import colors from '../../utils/colors'

const EnabledDistrictsScreen = ({route}) => {

    const list = route.params.list

    return (
        <View>
            <FlatList
                data={list}
                renderItem={({item, index})=>(
                    <View style={styles.item}>
                        <Label fontSize={16}>{item}</Label>
                    </View>
                )}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    item: {
        padding: 10,
        borderBottomColor: colors.grayLigth,
        borderBottomWidth: StyleSheet.hairlineWidth
    }
})

export default EnabledDistrictsScreen