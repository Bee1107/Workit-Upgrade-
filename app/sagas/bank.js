import { call, put, takeLatest, select } from 'redux-saga/effects'
import { actions } from '../redux/action'
import { addAccountBank, getAccountBank, deleteAccountBank } from '../api/bank'

const { POST, GET, DELETE, } = actions('bank')

function* postBank(action) {
   try{
      const user = yield select(state => state.user.user)
      const { contact_number, email, userId } = user
         
      const payload = {
         ...action.data,
         phone: contact_number,
         email,
         user_id: userId
      }

      console.log('payload', payload)

      const response = yield call(addAccountBank, payload)
      console.log('errresponseor', response)
      yield put({ type: POST.SUCCESS })

   } catch(e){
      console.log('error', e)
      yield put({ type: POST.ERROR })
   }
}

function* getBank(){
  
   try{
      const user = yield select(state => state.user.user)
      const response = yield call(getAccountBank, user.userId)

      yield put({ type: GET.SUCCESS, response: response.data[0]})
   }catch(e){
      yield put({ type: GET.ERROR })
   }
}

function* deleteBank(){
   try{
      const user = yield select(state => state.user.user)
      const bank = yield select(state => state.bank.bank)
      yield call(deleteAccountBank, {user_id: user.userId, bank_id: bank.bank_detail_id})
      yield put({ type: DELETE.SUCCESS})
   }catch(e){
      yield put({ type: DELETE.ERROR})
   }
}

export function* getBankAction(){
   yield takeLatest([GET.START, POST.SUCCESS, DELETE.SUCCESS], getBank)
}

export function* postBankAction(){
   yield takeLatest(POST.START, postBank)
}

export function* deleteBankAction(){
   yield takeLatest(DELETE.START, deleteBank)
}

