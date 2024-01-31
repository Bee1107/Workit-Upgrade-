import React, { useEffect, useState } from 'react'
import { View, StyleSheet, Image } from 'react-native'
import SemiHeading from '../../components/text/SemiHeading'
import { WebView } from 'react-native-webview'
import { images } from '../../assets'
import colors from '../../utils/colors'

 const PaymmentScreen = ({ post, isLoading, paymentResponse, navigation, route, validation }) => {

  const [localLoading, setLocalLoading ] = useState(true)

  useEffect(() => {
    post(route.params)
  }, [])

  const EmptyView = () =>  (
    <View style={styles.overlay}>
      <Image source={images.volumenIcon.creditCard} />
      <SemiHeading style={{marginTop: 10}}>Conectando con la Pasarela de pagos</SemiHeading>
    </View>
  )

  const onLoadEnd = ({ nativeEvent }) => {
    if(nativeEvent.code === -1003){
      validation(route.params)
      navigation.goBack(null)
      if(route.params.callback){
        route.params.callback()
      }
    }
    setLocalLoading(nativeEvent.loading)
  }

  const onLoadStart = () => setLocalLoading(true)

  return (
    <View style={styles.container}>
      
      {!isLoading && <WebView 
                        originWhitelist={['*']}
                        javaScriptEnabled={true}
                        thirdPartyCookiesEnabled={true}
                        source={{ uri: paymentResponse.url }}
                        onLoadEnd={onLoadEnd}
                        onLoadStart={onLoadStart}
                      />}
      {(isLoading || localLoading) && <EmptyView />}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white
  },
  lottie:{
    width: 300,
    height: 300,
    alignSelf:'center'
  },
  overlay:{
    flex: 1,
    top:0,
    left:0,
    width:'100%',
    height:'100%',
    position:'absolute',
    justifyContent:'center',
    alignItems: 'center',
    backgroundColor: colors.white
  }
})

export default PaymmentScreen