import { call, put, takeLatest, select } from 'redux-saga/effects'
import { actions } from '../../redux/action'
import { getPostedJobForMe } from '../../api/job'

const { GET } = actions('worker.jobs')

function* getDirectJobs(){
   try{
      const user = yield select(state => state.user.user)
      const response = yield call(getPostedJobForMe, user.userId)
      yield put({type: GET.SUCCESS, response: response.data })
   } catch(e){
      yield put({type: GET.ERROR, message: e.message})
   }
}


export function* getDirectJobsAction(){
   yield takeLatest(GET.START, getDirectJobs)
}
