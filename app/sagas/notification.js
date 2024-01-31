import { call, put, takeLatest, select, all } from 'redux-saga/effects'
import { actions } from '../redux/action'
import { fetchNotifications } from '../api/notifications'
import { getFixedNow } from '../utils/date'
import firestore from '@react-native-firebase/firestore'

const { GET, READ  } = actions('notification')

function* getNotifications(){
   try{
      const user = yield select(state => state.user.user)
      const response = yield call(fetchNotifications, user.userId)
      const now = getFixedNow()
      
      const fixedReponse = response.data.filter(({created_at}) => created_at >= now)
      const fixedReponseOld = response.data.filter(({created_at}) => created_at < now)

      yield put({type: GET.SUCCESS, response: {
         today: fixedReponse,
         old: fixedReponseOld
      }})

   } catch(e){
      yield put({type: GET.ERROR, message: e.message})
   }
}

function* readNotification(action){
   try{
      const { data } = action
      const firestoneWrapper = firestore().collection('notifications').doc(data.notification_id)
      yield call([firestoneWrapper, firestoneWrapper.update], { read: true })
      yield put({ type: READ.SUCCESS })
   }catch(e){
      yield put({ type: READ.ERROR })
   }
}


function* getNotificationsAction(){
   yield takeLatest(['AWAKE', GET.START, READ.SUCCESS], getNotifications)
}

function* readNotificationAction(){
   yield takeLatest(READ.START, readNotification)
}


export function* notificationActions(){
   yield all([
      getNotificationsAction(),
      readNotificationAction(),
   ])
}