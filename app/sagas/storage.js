import { call, put, takeLatest, select } from 'redux-saga/effects'
import { actions } from '../redux/action'
import AsyncStorage from '@react-native-async-storage/async-storage'

const { READ, SAVE } = actions('storage')

function* readInStorage(){
    try {
        const user = yield select(state => state.user.user)
        const { userId } = user
        const response = yield call(AsyncStorage.getItem, `@${userId}_storage4`)
  
        yield put({type: READ.SUCCESS, response: JSON.parse(response) })
    } catch(e) {
        yield put({type: READ.ERROR })
    }
}

function* saveInStorage(action){
    try{
        
       const user = yield select(state => state.user.user)
       const { userId } = user
       const response = yield call(AsyncStorage.getItem, `@${userId}_storage4`)
       const currentObject = response ? { ...(JSON.parse(response)) } : {}
       yield call(AsyncStorage.setItem, `@${userId}_storage4`, JSON.stringify({ ...currentObject, ...action.data }))
       yield put({type: SAVE.SUCCESS })
   
    } catch(e){
       yield put({type: SAVE.ERROR })
    }
 }
 
 export function* saveInStorageAction(){
    yield takeLatest(SAVE.START, saveInStorage)
 }

 export function* readInStorageAction(){
    yield takeLatest([SAVE.SUCCESS, READ.START], readInStorage)
 }
 
 