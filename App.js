import React, {useEffect} from 'react'
import { StatusBar } from 'react-native'
import {enableScreens} from 'react-native-screens'
import {Provider} from 'react-redux'
import store from './app/redux/store'
import Root from './app/navigation'
import messaging from '@react-native-firebase/messaging'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import MapboxGL from '@rnmapbox/maps'
import Toast, { BaseToast } from 'react-native-toast-message'
import auth from '@react-native-firebase/auth'
import { MAPBOX_TOKEN } from './app/utils/constants'
import colors from './app/utils/colors'
import firestore from '@react-native-firebase/firestore'
import { Notifications } from 'react-native-notifications'
import { navigate } from './app/navigation/rootNavigation'


MapboxGL.setAccessToken(MAPBOX_TOKEN)

enableScreens()

const toastConfig = {
  success: ({ text1,text2, props, ...rest }) => (
    <>
    {props && props.showBorder && (
       <BaseToast
       {...rest}
       style={{ borderLeftColor: 'green' , height:100, backgroundColor: colors.white }}
       contentContainerStyle={{ padding: 10 }}
       text1Style={{
         fontSize: 18,
         color: colors.black
       }}
       text2Style={{
         fontSize: 16,
         color: colors.black
       }}
       text1={text1}
       text2={text2}
     />
    )}
    {!(props && props.showBorder) && null}
   
    </>
  )
}

async function requestUserPermission() {
  const authorizationStatus = await messaging().requestPermission()
 
  if (authorizationStatus) {
   
  }
}


async function saveTokenToDatabase(token) {
   
  const userId = auth().currentUser.uid;
 
  await firestore()
          .collection('users')
          .doc(userId)
          .update({
            fcm_token: firestore.FieldValue.arrayUnion(token),
          }) 
}

const App = () => {

  useEffect(() => {
    store.dispatch({type: 'AWAKE'})
    requestUserPermission()
  }, [])

  const navigateWithPayload = payload => {

    const { job_id, job_name, bid_id, sender_id, owner_id, type, chatId } = payload
 
    const job = {
        job_id,
        job_name
    }

    if(!type || type > 21){
      return
    }
  

    switch(parseInt(`${type}`)){
        case 2:
          store.dispatch({type: 'SELECT.USER.START', data: {
            name: '',
            userId: sender_id,
            work_images:[]
        }})
    
        navigate('WorkerProfile', { screen:'WorkerProfile', params: { 
              worker: {
                name: '',
                userId: sender_id,
                work_images:[]
            },
            isLoading: true,
            bid_id
        }})

        break
        case 4:
            navigate('BidDetail', { 
                job:{
                    job_id: job_id
                },
                bid: {
                    bid_id
                }
              })
        break
        case 20:
          navigate('JobDetail', { item : job})
        break;
        case 21:
          navigate('ChatContainer', { screen:'ChatList', params: { chatId }  })
        break;
        default:

             if(auth().currentUser.uid ===  owner_id){
              navigate('RunningJob', { screen:'CurrentJob', params:{ job }})
             } else {
              navigate('RunningJobWorker', { screen:'CurrentJob', params:{ job }})
             }
            
        break
    }
  }

  useEffect(() => {
    // Assume a message-notification contains a "type" property in the data payload of the screen to open

    messaging().onNotificationOpenedApp(remoteMessage => {
      setTimeout(() => {
        navigateWithPayload(remoteMessage.data)
      }, 1000)
     
     
    });

    // Check whether an initial notification is available
    messaging()
      .getInitialNotification()
      .then(remoteMessage => {
        if (remoteMessage) {
          setTimeout(() => {
            navigateWithPayload(remoteMessage.data)
          
          }, 1000)
         
        }
        // setLoading(false);
      });
  }, []);

  useEffect(() => {
   
    /*
    Notifications.events().registerNotificationOpened((notification, completion) => {
      navigateWithPayload(notification.payload)
      completion()
    })
    */

    Notifications.events().registerNotificationReceivedBackground((notification, completion) => {
      completion({alert: true, sound: true, badge: false})
    })

    Notifications.events().registerNotificationReceivedForeground((notification, completion) => {
      completion({alert: true, sound: true, badge: false})
    })

  }, [])

  useEffect(() => {
    messaging()
      .getToken()
      .then(token => saveTokenToDatabase(token))

    return messaging().onTokenRefresh(token => saveTokenToDatabase(token))
  }, [])



  useEffect(() => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
     
    })

    return unsubscribe
  }, [])

  return (
    <>
      <SafeAreaProvider>
        <Provider store={store}>
          <>
          <StatusBar
            translucent 
            backgroundColor="transparent"
            barStyle="dark-content"
          />
          <Root />
          </>
        </Provider>
      </SafeAreaProvider>
      <Toast config={toastConfig} ref={ref => Toast.setRef(ref)} />
    </>
  )
}

export default App
