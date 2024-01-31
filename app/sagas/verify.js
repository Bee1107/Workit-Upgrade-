import { call, put, takeLatest } from 'redux-saga/effects'
import { actions } from '../redux/action'
import { sendVerifyEmail, verifyEmail } from '../api/user'
import auth from '@react-native-firebase/auth'
import { getErrorFromCode } from './error.config'

const VERIFY_EMAIL = actions('verifyEmail')
const SEND_CODE = actions('sendCode')
const RESET_PASSWORD = actions('resetPassword')

function* resetPassword(action){
   try{
      const { email } = action.data
      const authWrapper = auth()
      yield call([authWrapper, authWrapper.sendPasswordResetEmail], email)
      yield put({ type: RESET_PASSWORD.POST.SUCCESS })
   }catch(e){
      yield put({ type: RESET_PASSWORD.POST.ERROR })
   }
}

function* sendEmail(action){
   try{
        yield call(sendVerifyEmail, action.data)
        yield put({ type: VERIFY_EMAIL.POST.SUCCESS })
   } catch(e){
        yield put({ type: VERIFY_EMAIL.POST.ERROR })
   }
}

function* verifyCode(action){
   try{
     
      const authWrapper = auth()
      yield call(verifyEmail, {...action.data, user_id: authWrapper.currentUser.uid})
      
      yield put({ type: SEND_CODE.POST.SUCCESS })
    
   } catch(e){
        yield put({ type: SEND_CODE.POST.ERROR, message: getErrorFromCode(e.message) })
   }
}


export function* resetPasswordAction(){
   yield takeLatest(RESET_PASSWORD.POST.START, resetPassword)
}

export function* sendEmailAction(){
   yield takeLatest(VERIFY_EMAIL.POST.START, sendEmail)
}

export function* verifyCodeAction(){
   yield takeLatest(SEND_CODE.POST.START, verifyCode)
}

