import React from 'react'
import { View, StyleSheet } from 'react-native'
import colors from '../../../utils/colors'
import SkeletonPlaceholder from 'react-native-skeleton-placeholder'

const SkeletonItem = () => (
    <View style={{height: 340}}>
        <SkeletonPlaceholder backgroundColor={colors.skeleton.backgroundColor} highlightColor={colors.skeleton.highlightColor}>
        <View style={{padding: 20, height: 340}}>
            <View style={styles.card}>
                <View style={{ width: '100%', height: 160, borderTopLeftRadius: 10, borderTopRightRadius: 10}} />
                <View style={{padding: 10}}>
                    <View  style={{height: 30, width: 240, borderRadius: 5}} />
                    <View style={{flexDirection: 'row', alignItems:'center', marginTop: 10}}>
                        <View  style={{width: 30, height: 30, borderRadius: 15}} />
                        <View  style={{marginLeft: 10, width: 120, height: 20, borderRadius: 5}} />
                    </View>
                    <View style={{width: '100%', height: 15, borderRadius: 5, marginTop: 5}} />
                    <View style={{width: '90%', height: 15, borderRadius: 5, marginTop: 5}} />

                    <View style={{marginTop: 10, flexDirection: 'row', alignItems: 'center'}}>
                        <View  style={{width:16, height: 16, borderRadius: 8}} />
                        <View  style={{marginLeft: 10, width: 120, height: 10, borderRadius: 5}} />
                    </View>
                </View>
            </View>
        </View>
        </SkeletonPlaceholder>
    </View>
)

const styles = StyleSheet.create({
    card:{
        borderColor: colors.grayLigth,
        borderWidth: 1,
        borderRadius: 10
    }
})

export default SkeletonItem