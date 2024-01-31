import { call, put, takeLatest } from 'redux-saga/effects'
import { actions } from '../redux/action'
import { get } from '../api/term'

const { GET  } = actions('term')

function* fetchTerms(){
   try{
 
      const response = yield call(get)
      yield put({ type: GET.SUCCESS, response: response.data.terms_and_conditions})

   } catch(e){
    yield put({ type: GET.ERROR })
   }
}

export function* fetchTermsaction(){
   yield takeLatest(GET.START, fetchTerms)
}

