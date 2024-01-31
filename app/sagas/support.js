import { call, put, takeLatest, select } from 'redux-saga/effects'
import { actions } from '../redux/action'
import { post } from '../api/support'

const { POST  } = actions('support')

function* postSupport(action){
   try{

      const user = yield select(state => state.user.user)
      const response = yield call(post, user.userId, action.data.message)
      yield put({type: POST.SUCCESS, response: response.data})
   } catch(e){
      yield put({type: POST.ERROR, message: e.message})
   }
}

export function* postSupportAction(){
   yield takeLatest(POST.START, postSupport)
}

