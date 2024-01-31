import React from 'react'
import { View, StyleSheet, Image } from 'react-native'
import Heading from '../../components/text/Heading'
import colors from '../../utils/colors'
import MapboxGL from '@rnmapbox/maps'
import Card from '../../components/card'
import Label from '../../components/text/Label'
import { images } from '../../assets'
import SkeletonPlaceholder from 'react-native-skeleton-placeholder'

const SkeletonView = () => {
    return (
        <Card padding={0}>
           
                <>
                <View style={{padding: 20}}>
                    
                    <View>
                        <Heading color={colors.mainColor} style={{marginBottom: 10}}>Dirección</Heading>
                        <SkeletonPlaceholder backgroundColor={colors.skeleton.backgroundColor} highlightColor={colors.skeleton.highlightColor}>
                            <View  style={{width: 260, height: 20, borderRadius: 8}} />
                        </SkeletonPlaceholder>
                    </View>
                </View>
                <SkeletonPlaceholder backgroundColor={colors.skeleton.backgroundColor} highlightColor={colors.skeleton.highlightColor}>
                    <View style={{ borderBottomLeftRadius: 10, borderBottomRightRadius: 10 , overflow:'hidden'}} >
                        <View style={{ height: 200}}  />
                    </View>
                </SkeletonPlaceholder>
            </>
        </Card>
    ) 
  }

  
const JobDetailScreen = ({ address, isLoading = true, style = {} }) => {

    const { lon, lat} = address

    return (
        <>
        {isLoading && (
            <SkeletonView />
        )}
        {!isLoading && (
            <Card padding={0} style={style}>
                <View style={{padding: 20}}>
                    <Heading color={colors.text.title}>Dirección</Heading>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                        <Image source={images.pin.gradient} style={{width: 12, height: 12}} resizeMode="contain" />
                        <Label style={{marginLeft: 5}}>{`${address.street} ${address.housenumber}, ${address.city}`}</Label>
                    </View>
                </View>
                <View style={{ borderBottomLeftRadius: 10, borderBottomRightRadius: 10 , overflow:'hidden'}} >
                    <MapboxGL.MapView style={{ height: 200}}  >
                        
                        <MapboxGL.PointAnnotation
                            key="pointAnnotation"
                            id="pointAnnotation"
                            coordinate={[lon, lat]}>
                                <View style={{
                                    height: 24, 
                                    width: 24, 
                                    backgroundColor: colors.mainColor, 
                                    borderRadius: 12, 
                                    borderColor: colors.white, 
                                    borderWidth: 3
                                    }} />
                        </MapboxGL.PointAnnotation>
                        <MapboxGL.Camera 
                            zoomLevel={14}
                            centerCoordinate={[lon, lat]}
                        />
                        
                    </MapboxGL.MapView>
                </View>
            </Card>
        )}
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        justifyContent:'space-between'
    },
    bottom:{
        padding: 20,
        backgroundColor: 'white'
    },
    modal:{
        flex: 1,
        flexDirection:'column',
        backgroundColor:'rgba(0,0,0,0.6)',
        justifyContent:'flex-end'
    },
    bottomView:{
        backgroundColor:'white',
        borderTopColor:'#CCC',
        justifyContent:'flex-end',
        borderTopWidth: StyleSheet.hairlineWidth,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        paddingTop: 10
    },
})

export default JobDetailScreen