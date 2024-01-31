import { call, put, takeLatest, select } from 'redux-saga/effects'
import { actions } from '../redux/action'
import { fetchVendorJobsApi, fetchOwnerJobsApi } from '../api/job'

const { DELETE } = actions('meJobs')
const { GET } = actions('vendor_running_jobs')
const OWNER_RUNNING_JOBS = actions('owner_running_jobs')

function* getRunningJobs() {
   try{
      const user = yield select(state => state.user.user)
      const response = yield call(fetchVendorJobsApi, user.userId)
      yield put({type: GET.SUCCESS, response: response.data})
    } catch(e){
      yield put({type: GET.ERROR })
    }
}

function* getRunningOwnerJobs() {
   try{
        const user = yield select(state => state.user.user)
        const response = yield call(fetchOwnerJobsApi, user.userId)
        
        yield put({type: OWNER_RUNNING_JOBS.GET.SUCCESS, response: response.data})
    } catch(e){
      yield put({type: OWNER_RUNNING_JOBS.GET.ERROR })
    }
}


export function* getRunningJobsAction(){
   yield takeLatest([GET.START, DELETE.SUCCESS], getRunningJobs)
}

export function* getRunningOwnerJobsAction(){
   yield takeLatest(OWNER_RUNNING_JOBS.GET.START, getRunningOwnerJobs)
}

