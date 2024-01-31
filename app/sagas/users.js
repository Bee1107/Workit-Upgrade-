import { call, put, takeLatest, select, cancel, delay, all } from 'redux-saga/effects'
import auth from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore'
import { actions } from '../redux/action'
import { getPlatformPath, getFileName, uploadImageToStorage } from '../utils/File'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { getErrorFromCode } from './error.config'
import { signup } from '../api/user'
import messaging from '@react-native-firebase/messaging'
import SplashScreen from 'react-native-splash-screen'
import { normalizeStr } from '../utils/String'

const { GET, SIGNUP, SIGNIN, READ, LOGOUT, UPLOAD, PUSH } = actions('user')
const WORKER_PROFILE = actions('worker_profile')
const USER_PROFILE = actions('user.profile')
const ADDRESS = actions('address')
const SEND_CODE = actions('sendCode')
const WORKER = actions('worker')

const getToken = () => messaging().getToken()
const subscribeToTopic = topic => messaging().subscribeToTopic(topic).then(() => true).catch(() => true)

const subscribeMe = (userObject, address) => {
   const ids = userObject.myCategories.map(({category}) => category.category_id)
   const cities = userObject.addresses.filter(({uid}) => uid === address.uid).map(({district}) => normalizeStr(district))
   return ids.map(e => `${cities[0]}_${e}`).map(e => subscribeToTopic(e))
  
}

function* logoutUser(){
   try{
      const user = yield select(({ user }) => user.user)
      const { userId } = user
      const authWrapper = auth()
      yield call([authWrapper, authWrapper.signOut])
     

      yield call(AsyncStorage.removeItem, '@currentUser')
      yield call(AsyncStorage.removeItem, '@selectedAddress')
      yield call(AsyncStorage.removeItem, `@${userId}_storage4`)
     
      yield put({type: LOGOUT.SUCCESS})
   }catch(e){
      yield put({type: LOGOUT.ERROR, message: e.message})
   }
}

function* signupUser(action) {
   try {

      const fcm_token = yield call(getToken)
      const authWrapper = auth()

      const image = yield select(state => state.signup.image)

      if(image === null){
         yield put({type: SIGNUP.ERROR, message: 'NOT_IMAGE' })
         yield cancel()
      }

      const {  
         name,
         father_last_name,
         mother_last_name,
         contact_number,
         email,
         password,
         nationality } = action.data
      

  
      const profile_picture = yield call(uploadImageToStorage, getPlatformPath(image).value, `profile_images/${getFileName(image.fileName, getPlatformPath(image).value)}`)

 
      const response = yield call(signup, {
         name,
         father_last_name,
         mother_last_name,
         contact_number: `${contact_number}`,
         email,
         password,
         nationality,
         profile_picture,
         fcm_token
      })

      if(response.status === 200){
         yield call([authWrapper, authWrapper.signInWithEmailAndPassword], email, password)
         const firestoneWrapper = firestore().collection('users').doc(authWrapper.currentUser.uid)
         const { _data } = yield call([firestoneWrapper, firestoneWrapper.get])
         yield call(AsyncStorage.setItem, '@currentUser',  JSON.stringify({..._data, userId: authWrapper.currentUser.uid}))
         yield put({ type: SIGNUP.SUCCESS, params: {user: action.data }})
      } else {
         yield put({type: SIGNUP.ERROR, message: getErrorFromCode(response.message) })
      }
   

      
   } catch (e) {
      yield put({type: SIGNUP.ERROR, message: getErrorFromCode(e.code) })
   }
}


function* signinUser(action) {
   try {
      const authWrapper = auth()

      const { email, password } = action.data
      yield call([authWrapper, authWrapper.signInWithEmailAndPassword], email, password)

      const firestoneWrapper = firestore().collection('users').doc(authWrapper.currentUser.uid)
      const { _data } = yield call([firestoneWrapper, firestoneWrapper.get])
      yield put({type: SIGNIN.SUCCESS, user : _data})
   
   } catch (e) {
      yield put({type: SIGNIN.ERROR, message: getErrorFromCode(e.code)})
   }
}

function* detectCurrentUser(){
   
   try{
      const authWrapper = auth()
      yield delay(500)
      console.log('READ USER')
      if (authWrapper.currentUser && authWrapper.currentUser !== null) {
          const user = yield call(AsyncStorage.getItem, '@currentUser')

          console.log('READ USER-->>',user)
          if (user === undefined || user === null || user === '') {
           
              yield put({ type: READ.ERROR, message: 'user not found' })
          } else {
               const userObject = JSON.parse(user)
               console.log('READ USER->',user)
               yield put({ type: GET.START })
               yield put({ type: READ.SUCCESS, user: userObject })
            
               const address = yield call(AsyncStorage.getItem, '@selectedAddress')
       
               if(address === null){
                  if(userObject.addresses.length > 0){
                     yield all(subscribeMe(userObject, { uid: userObject.addresses[0].uid}))
                     yield call(AsyncStorage.setItem, '@selectedAddress', JSON.stringify({ uid: userObject.addresses[0].uid}))
                     yield put({type: ADDRESS.SELECT.START, data: { uid: userObject.addresses[0].uid} })
                  }
               } else {
                 
                  yield all(subscribeMe(userObject, JSON.parse(address)))
                  yield put({type: ADDRESS.SELECT.START, data: JSON.parse(address) })
               }

               
          }
      } else {
          yield put({ type: READ.ERROR, message: 'user not found' })
      }

      yield call(SplashScreen.hide)

   }catch(e){
      console.log('READ USER ERROR', e)
      yield call(SplashScreen.hide)
      yield put({type: READ.ERROR, message: e.message})
   }
}

function* uploadUserProfile(action){

 
   try{
      const { data } = action
      const { image, photoField } = data


      const { value } = yield call(getPlatformPath, image)


      const fileName = yield call(getFileName, image.fileName, value)
      const picture = yield call(uploadImageToStorage, value, `profile/${fileName}`)
      const authWrapper = auth()
     
      const firestoneWrapper = firestore().collection('users').doc(authWrapper.currentUser.uid)
      yield call([firestoneWrapper, firestoneWrapper.update], { [photoField]: picture  })

      yield put({ type: USER_PROFILE.GET.START, data: {
         userId: authWrapper.currentUser.uid
      }})
      
      yield put({type: UPLOAD.SUCCESS })

   } catch(e){


      yield put({type: UPLOAD.ERROR })
   }
}

function* updateUser(action){
   try{
      const { data } = action
      const authWrapper = auth()
      const firestoneWrapper = firestore().collection('users').doc(authWrapper.currentUser.uid)
      yield call([firestoneWrapper, firestoneWrapper.update], { ...data })
      
      yield put({ type: PUSH.SUCCESS })
      yield put({type: GET.START})

   } catch(e){
      yield put({ type: PUSH.ERROR })
   }
}

function* updateWorker(action){
   try{

      const { data } = action

      const {userId} = yield select(state => state.user.user)


      const firestoneWrapper = firestore().collection('users').doc(userId)
      yield call([firestoneWrapper, firestoneWrapper.update], { ...data })
      
      yield put({ type: WORKER_PROFILE.PUSH.SUCCESS })
      yield put({ type: USER_PROFILE.GET.START, data: { userId }})

   } catch(e){
      yield put({ type: WORKER_PROFILE.PUSH.ERROR })
   }
}


function* getUser(){
  
   try{

     
      const authWrapper = auth()
    
      const firestoneWrapper = firestore().collection('users').doc(authWrapper.currentUser.uid)
      const { _data } = yield call([firestoneWrapper, firestoneWrapper.get])
    
      yield call(AsyncStorage.setItem, '@currentUser',  JSON.stringify({..._data, userId: authWrapper.currentUser.uid}))
      yield put({ type: GET.SUCCESS, data: {..._data, userId: authWrapper.currentUser.uid} })

   }catch(e){
      console.log('e->',e)
      yield put({ type: GET.ERROR })
   }
}

function* fetchUserProfile(action){
   try{
    
      const currentUser = yield select(state => state.user.user)
      const firestoneWrapper = firestore().collection('users').doc(action.data.userId)
      const user = yield call([firestoneWrapper, firestoneWrapper.get])


      if(currentUser.userId === action.data.userId){
         const selectedAddress = yield call(AsyncStorage.getItem,'@selectedAddress')
         const selectedAddressObject = JSON.parse(selectedAddress)
       
         if(selectedAddressObject && selectedAddressObject.uid){
            yield all(subscribeMe(user._data, { uid: selectedAddressObject.uid}))
         }
      }

      yield put({ type: USER_PROFILE.GET.SUCCESS, data: {...user._data, userId: action.data.userId } })

   }catch(e){

      console.log('error', e)
      yield put({ type: USER_PROFILE.GET.ERROR })
   }
}

function* selectAddress(action){
   try{

      const { uid } = action.data
     
      yield call(AsyncStorage.setItem, '@selectedAddress', JSON.stringify({ uid }))
      const user = yield select(state => state.user.user)
      yield all(subscribeMe(user, { uid }))
      yield put({type: ADDRESS.SELECT.SUCCESS})
   }catch(e){
      yield put({type: ADDRESS.SELECT.ERROR})
   }
}

export function* getUserAction(){
   yield takeLatest([
      WORKER.POST.SUCCESS,
      SEND_CODE.POST.SUCCESS, 
      SIGNIN.SUCCESS, SIGNUP.SUCCESS ,GET.START, ADDRESS.POST.SUCCESS, ADDRESS.DELETE.SUCCESS], getUser)
}


export function* updateUserAction(){
   yield takeLatest(PUSH.START, updateUser)
}

export function* updateWokerAction(){
   yield takeLatest(WORKER_PROFILE.PUSH.START, updateWorker)
}


export function* signupAction() {
  yield takeLatest(SIGNUP.START, signupUser)
}

export function* signinAction() {
   yield takeLatest(SIGNIN.START, signinUser)
 }

export function* logoutAction(){
   yield takeLatest(LOGOUT.START, logoutUser)
}

export function* currentUserAction(){
   yield takeLatest('AWAKE', detectCurrentUser)
}

export function* uploadUserProfileAction(){
   yield takeLatest(UPLOAD.START, uploadUserProfile)
}

export function* fetchUserProfileAction(){
   yield takeLatest([USER_PROFILE.GET.START, ADDRESS.DELETE.SUCCESS], fetchUserProfile)
}

export function* selectAddressAction(){
   yield takeLatest(ADDRESS.SELECT.START, selectAddress)
}