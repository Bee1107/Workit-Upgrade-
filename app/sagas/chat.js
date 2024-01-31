import { put, takeLatest, call , all, select } from 'redux-saga/effects'
import { actions } from '../redux/action'
import { getPlatformPath, getFileName, uploadImageToStorage } from '../utils/File'
import { sendNotification } from  '../api/notifications'
import firestore from '@react-native-firebase/firestore'

const { POST } = actions('chat.image')
const CHAT_USER  = actions('chat.user')

function* retrieveUserChat(action){
   try{
      const { userId } = action.data

      const firestoneWrapper = firestore().collection('users').doc(userId)
      const { _data } = yield call([firestoneWrapper, firestoneWrapper.get])
     
      yield put({type: CHAT_USER.GET.SUCCESS, data: _data })
   }catch(e){
    
      yield put({type: CHAT_USER.GET.ERROR })
   }
}

function* uploadImage(action){
   try{
    
      const responseImages = yield all(
         [action.data.image]
         .filter(img => img !== null)
         .map(data => ({
             value: getPlatformPath(data).value,
             fileName: getFileName(data.fileName, getPlatformPath(data).value),
         }))
         .map(({ value, fileName }) => uploadImageToStorage(value, `chat/${fileName}`)))

      
      yield call(action.data.callback, responseImages[0])
       
      yield put({ type: POST.SUCCESS})
   } catch(e){
      yield put({ type: POST.ERROR})
   }
}

function* sendNotificationChat(action){
   try{
      const { message, chatId } = action.data
     

      const user = yield select(state => state.user.user)
      

      const { userSelected } = yield select(state => state.chat)



      const response = yield all(sendNotification(userSelected, `Tienes un mensaje de ${user.name} ${user.father_last_name}`, message, chatId))
    
     
      yield put({type: CHAT_USER.POST.SUCCESS})
   }catch(e){

      yield put({type: CHAT_USER.POST.ERROR})
   }
}

export function* uploadImageAction(){
    yield takeLatest(POST.START, uploadImage)
}

export function* retrieveUserChatAction(){
   yield takeLatest(CHAT_USER.GET.START, retrieveUserChat)
}

export function* sendNotificationChatAction(){
   yield takeLatest(CHAT_USER.POST.START, sendNotificationChat)
}