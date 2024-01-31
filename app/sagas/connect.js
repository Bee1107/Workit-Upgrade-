import { call, put, takeLatest } from 'redux-saga/effects'

import firestore from '@react-native-firebase/firestore'
import { actions } from '../redux/action'

import connect from './utils'

const { GET, FB_CONNECT, APPLE_CONNECT, GOOGLE_CONNECT } = actions('user')

function* singinWithFacebook() {
  
   try {
     
       const response = yield call(connect.facebookConnect)
       
       const firestoneWrapper = firestore().collection('users').doc(response.user._user.uid)
       const { _data } = yield call([firestoneWrapper, firestoneWrapper.get])
       
       if (_data === undefined) {
           const {
               last_name, first_name, email, picture,
           } = response.additionalUserInfo.profile
           yield call([firestoneWrapper, firestoneWrapper.set], {
               profile_picture: picture.data.url, 
               name: first_name, 
               father_last_name: last_name, 
               email, 
               uid: response.user._user.uid,
               credits: '0',
               type: 'HIRE'
           })
       }

       yield put({ type: FB_CONNECT.SUCCESS })
       yield put({ type: GET.START })
       
   } catch (e) {
       yield put({ type: FB_CONNECT.ERROR })
   }
}

function* singinWithApple() {
   try {
       const response = yield call(connect.appleConnect)
       const firestoneWrapper = firestore().collection('users').doc(response.user._user.uid)
       const { _data } = yield call([firestoneWrapper, firestoneWrapper.get])

       if (_data === undefined) {
           const { last_name, first_name, email } = response.additionalUserInfo.profile
           yield call([firestoneWrapper, firestoneWrapper.set], {
               name: first_name || 'Nuevo', 
               father_last_name: last_name || 'Usuario', 
               email, 
               uid: response.user._user.uid,
               credits: '0',
               type: 'HIRE'
           })
       }

       yield put({ type: APPLE_CONNECT.SUCCESS })
       yield put({ type: GET.START })
   } catch (e) {
       yield put({ type: APPLE_CONNECT.ERROR })
   }
}


function* singinWithGoogle() {

   try {

       const response = yield call(connect.googleConnect)
      
       const firestoneWrapper = firestore().collection('users').doc(response.user._user.uid)
       const { _data } = yield call([firestoneWrapper, firestoneWrapper.get])

       if (_data === undefined) {
         const { profile } = response.additionalUserInfo
         const { email, given_name, family_name, picture } = profile

           yield call([firestoneWrapper, firestoneWrapper.set], {
               name: given_name || 'Nuevo', 
               father_last_name: family_name || 'Usuario', 
               email, 
               uid: response.user._user.uid,
               profile_picture: picture,
               credits: '0',
               type: 'HIRE'
           })
       }

       yield put({ type: GOOGLE_CONNECT.SUCCESS })
       yield put({ type: GET.START })
 
   } catch (e) {
       yield put({ type: GOOGLE_CONNECT.ERROR, message: JSON.stringify(e) })
   }
}

export function* singinWithFacebookAction() {
   yield takeLatest(FB_CONNECT.START, singinWithFacebook)
}

export function* singinWithAppleAction() {
   yield takeLatest(APPLE_CONNECT.START, singinWithApple)
}

export function* singinWithGoogleAction() {
   yield takeLatest(GOOGLE_CONNECT.START, singinWithGoogle)
}
