import { call, put, takeLatest, select } from 'redux-saga/effects'
import { actions } from '../redux/action'
import { getAddressAutocomplete, getLocation } from '../api/address'
import auth from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore'

const { GET, POST, DELETE, SELECT } = actions('address')
const LOCATION = actions('location')

function* deleteAddress(action){
   try{

       const currentAddress = yield select(state => state.user.user.addresses)
       const addresses = currentAddress.filter((e,i) => i !== action.data.index)
      
       const authWrapper = auth()

       const firestoneWrapper = firestore().collection('users').doc(authWrapper.currentUser.uid)
       yield call([firestoneWrapper, firestoneWrapper.update], { addresses })
       yield put({ type: DELETE.START })

   } catch(e){
      yield put({ type: DELETE.SUCCESS })
   }
}


function* getAddress(action){
   try{

        const { predictions }  = yield call(getAddressAutocomplete, action.data.search)

        yield put({type: GET.SUCCESS, response : predictions })
  
   } catch(e){
      yield put({type: GET.ERROR, message: e.message})
   }
}

function* getLocationFromAddress(action){
   try{
      
  
      const response = yield call(getLocation, action.data.description)


  
      if(response.results.length > 0){
         yield put({type: LOCATION.GET.SUCCESS, data: response.results[0]})
      } else {
         yield put({type: LOCATION.GET.ERROR })
      }
  
     

 } catch(e){

    yield put({type: LOCATION.GET.ERROR, message: e.message})
 }
}

function* postAddress(action){
   try{
    
      const { location } = yield select(state => state.address)
      const user = yield select(state => state.user.user)
      const { geometry, address_components } = location
 
      const lat = geometry.location.lat
      const lon = geometry.location.lng

      let street = ''
      let district = ''

      const result =  address_components.find(e => e.types.includes('route') )
      const result2 =  address_components.find(e => e.types.includes('locality') ||    e.types.includes('political'))

      if(result){
         street = result.long_name
      }

      if(result){
         district = result2.long_name
      }
  
      const payload = { ...action.data, street, district, lat, lon }
      
      const authWrapper = auth()

      const addressUID = Date.now()
      const currentAddress = (user.addresses) ? user.addresses : []
      const payloadAddress = [...currentAddress, ...[{uid: addressUID, ...payload}]]

      const firestoneWrapper = firestore().collection('users').doc(authWrapper.currentUser.uid)
      yield call([firestoneWrapper, firestoneWrapper.set], {  addresses: payloadAddress}, { merge: true })

      yield put({type: SELECT.START, data: { uid: addressUID  }})
      yield put({type: POST.SUCCESS})
 
   }catch(e){
      yield put({type: POST.ERROR})
   }
}

export function* getAddressAction(){
   yield takeLatest(GET.START, getAddress)
}

export function* getLocationFromAddressAction(){
   yield takeLatest(LOCATION.GET.START, getLocationFromAddress)
}

export function* postAddressAction(){
   yield takeLatest(POST.START, postAddress)
}


export function* deleteAddressAction(){
   yield takeLatest(DELETE.START, deleteAddress)
}




