import React, { useEffect } from 'react'
import { StyleSheet } from 'react-native'
import { WebView } from 'react-native-webview'
import colors from '../../../utils/colors'
import { SafeAreaView } from 'react-native-safe-area-context'

const htmlBody = html => `
  <html>
    <style>
      body {
        background: ${colors.white};
        color: ${colors.black};
        padding: 20px;
        font-size: 2em;
      }
    </style>
    <body>
      ${html}
    </body>
  </htlm>
`

const TermmsScreen = ({ get, html }) => {

    useEffect(()=>{
        get()
    }, [])

  return (
    <SafeAreaView style={styles.container} edges={['right', 'bottom', 'left']}>
      <WebView 
            style={styles.webView}
            originWhitelist={['*']}
            source={{ html: htmlBody(html) }}
            onLoadEnd={() => {}}
            onLoadStart={() => {}}
            />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white
  },
  webView:{
    flex: 1,
    backgroundColor: colors.white
  }
})

export default TermmsScreen