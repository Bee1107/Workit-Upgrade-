import React from 'react'
import { View, Dimensions, StyleSheet } from 'react-native'
import SkeletonPlaceholder from 'react-native-skeleton-placeholder'
import Card from '../../../components/card'
import colors from '../../../utils/colors'

const windowWidth = Dimensions.get('window').width

const SkeletonPagerWorker = () => (
    <>
      <View style={styles.container}>
               <Card padding={0} style={styles.cardContainer}>
                  <SkeletonPlaceholder backgroundColor={colors.skeleton.backgroundColor} highlightColor={colors.skeleton.highlightColor}>
                      <View style={{paddingTop: 80}}>
                          <View style={{ alignItems:'center', padding: 10, justifyContent:'space-between', flexDirection: 'row'}}>
                              <View style={{width: 140, height: 20,  borderRadius: 10}} />
                              <View style={{width: 100, height: 20, borderRadius: 10}} />
                          </View>
                          <View style={{paddingHorizontal: 20}}>
                              <View style={{width: '100%', height: 14, borderRadius: 10}} />
                              <View style={{width: '100%', height: 14, borderRadius: 10, marginTop: 5}} />
                              <View style={{width: '50%', height: 14, borderRadius: 10, marginTop: 5}} />
                          </View>
                      </View>
                  </SkeletonPlaceholder>
              </Card>
      </View>
      <View style={{flex: 1, width: '100%', alignItems:'center', padding: 10, justifyContent: 'center'}}>
          <SkeletonPlaceholder backgroundColor={colors.skeleton.backgroundColor} highlightColor={colors.skeleton.highlightColor}>
              <View style={{width: 100, height: 20, alignSelf: 'center', borderRadius: 10}} />
          </SkeletonPlaceholder>
      </View>
    </>
)

const styles = StyleSheet.create({
    container:{
        width: windowWidth, 
        height: 180,
        paddingHorizontal: 20, 
        marginTop: 10
    },
    cardContainer:{
        flex: 1,
    }
})

export default SkeletonPagerWorker