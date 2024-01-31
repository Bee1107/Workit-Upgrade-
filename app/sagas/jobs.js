import { call, put, takeLatest, takeEvery, select, all } from 'redux-saga/effects'
import { actions } from '../redux/action'
import { 
   fetchPostedMeJobs, 
   v2PostJob, 
   v2FetchFilterJobs, 
   ownerDeleteJob, 
   getOwnerJobDetailApi, 
   changeJobStatusApi, 
   releaseJobPaymentApi, 
   changeJobWorkerStatusApi,
   fetchCompletedMeJobs,
   fetchCompletedJobs,
   editJobApi
} from '../api/job'
import { getPlatformPath, getFileName, uploadImageToStorage } from '../utils/File'
import firestore from '@react-native-firebase/firestore'
import { groupByKey } from '../utils/array'
import { dateFixed } from '../utils/date'

const { POST } = actions('job.edit.date')
const { GET, DELETE } = actions('meJobs')
const CALENDAR_JOB = actions('calendarJobs')
const FORM_JOB = actions('postJob')
const JOB = actions('jobs')

const HISTORIAL_VENDOR_JOB = actions('historial.vendor.jobs')
const HISTORIAL_OWNER_JOB = actions('historial.owner.jobs')

const JOB_STATUS = actions('jobs.status')
const JOB_STATUS_WORKER = actions('jobs.worker.status')
const JOB_PAYMENT = actions('job.payment')
const JOB_DETAIL = actions('jobDetail')
const CLUSTER = actions('jobCluster')

function* getCompletedMeJobs(){
   try{

      const user = yield select(state => state.user.user)
      const response = yield call(fetchPostedMeJobs, user.userId)
      yield put({type: GET.SUCCESS, response: response.data.filter(({version}) => version === 'v2')})
  
   } catch(e){
      yield put({type: GET.ERROR, message: e.message})
   }
}

function* getCalendarJobs(action){

   try{
      const { data } = action
      const filterFromDate = new Date(data.date)
      filterFromDate.setMinutes(0)
      filterFromDate.setHours(0)
      filterFromDate.setSeconds(0)
      filterFromDate.setDate(1)

      const filterToDate = new Date(filterFromDate.getTime())
      filterToDate.setMonth(filterToDate.getMonth() + 1)


      const user = yield select(state => state.user.user)

                                     
      const firestoneWrapper = firestore()
                                 .collection('jobs')
                                 .where('user_id', '==', user.userId)  
                                 .where('job_time','>', filterFromDate.getTime() )
                                 .where('job_time','<', filterToDate.getTime() )
                
      const response = yield call([firestoneWrapper, firestoneWrapper.get])
      const jobs = []

      response.forEach((doc) => {
         const docData = doc.data()
         jobs.push(
         {
            job_id: doc.id,
            ...docData,
         })
      })

      const mapJobs = groupByKey(jobs.filter(({status}) => status !== 'POSTED').map(e => ({
         ...e,
         dateKey: new Date(e.job_time).getDate() - 1
      })), 'dateKey', title => title, 'date')

      yield put({type: CALENDAR_JOB.GET.SUCCESS, response: mapJobs})
   
  
   } catch(e){
      yield put({type: CALENDAR_JOB.GET.ERROR, message: e.message})
   }
}

function* postJob(){
   try{
      const job = yield select(state => state.formJob.data)
      const images = yield select(state => state.formJob.images)
      const user = yield select(state => state.user.user)
      const address = yield select(state => state.address.selectedAddress)

      const selectedAddress = user.addresses.filter(({ uid }) => uid === address.uid)

      const responseImages = yield all(
         images
         .filter(img => img !== null)
         .map(data => ({
             value: getPlatformPath(data).value,
             fileName: getFileName(data.fileName, getPlatformPath(data).value),
         }))
         .map(({ value, fileName }) => uploadImageToStorage(value, `jobs/${fileName}`)))

   
      
      const fromDate = dateFixed(job.fromDate)
      const fromTime = job.fromTime

      const toTime = job.toTime
      const toDate = dateFixed(job.toDate)

      const job_time = new Date(fromDate.getTime())
      job_time.setHours(fromTime.getHours())
      job_time.setMinutes(fromTime.getMinutes())
      job_time.setSeconds(fromTime.getSeconds())

      const payload = {
         user:{
            have_document: user.have_document,
            certificate: user.certificate ? user.certificate : false,
            email:  user.email,
            mother_last_name: user.mother_last_name,
            profile_picture: user.profile_picture,
            name: user.name,
            father_last_name: user.father_last_name,
            userId: user.userId
         },
         job:{
            ...job, 
            fromDate: fromDate.getTime(),
            toDate: toDate.getTime(),
            time: job_time.getTime(),
            fromTime: fromTime.getTime(),
            toTime: toTime.getTime(),
            isBetween: job.isBetween,
            isBetweenHour: job.isBetweenHour,
         },
         images: responseImages,
         address: (selectedAddress.length > 0) ? selectedAddress[0] : user.addresses[0],
         type: 'bidding'
      }

      yield call(v2PostJob, payload)
      yield put({ type: FORM_JOB.POST.SUCCESS})
   } catch(e){
     
      yield put({ type: FORM_JOB.POST.ERROR})
   }
}

function* fetchFilterJobs(action){
   try{
      const response = yield call(v2FetchFilterJobs, action.data)
      yield put({type: JOB.POST.SUCCESS, response: response.data})
   }catch(e){
      yield put({type: JOB.POST.ERROR})
   }
}

function* deleteMeJob(action){
   try{
      yield call(ownerDeleteJob, { job_id:  action.data.job.job_id})
      yield put({ type: DELETE.SUCCESS })
   }catch(e){
      yield put({ type: DELETE.ERROR })
   }
}

function* getOwnerJobDetail(action){
   try{
      const response = yield call(getOwnerJobDetailApi, action.data.jobId)
      yield put({ type: JOB_DETAIL.GET.SUCCESS, response: response.data })
   }catch(e){
      yield put({ type: JOB_DETAIL.GET.ERROR})
   }
  
}

function* changeJobStatus(action){

   try{
      const { job_id } = action.data
      const response = yield call(changeJobStatusApi, action.data)
      console.log('response -> ', response)
      yield put({ type: JOB_DETAIL.GET.START, data: { jobId: job_id } })
      yield put({ type: JOB_STATUS.POST.SUCCESS })
   }catch(e){
      console.log('error ->', e)
      yield put({ type: JOB_STATUS.POST.ERROR})
   }
}

function* changeJobWorkerStatus(action){
   try{

      const { job_id } = action.data
      yield call(changeJobWorkerStatusApi, action.data)
      yield put({ type: JOB_DETAIL.GET.START, data: { jobId: job_id } })
      yield put({ type: JOB_STATUS_WORKER.POST.SUCCESS })
   }catch(e){
      yield put({ type: JOB_STATUS_WORKER.POST.ERROR })
   }
}

function* releaseJobPayment(action){
   try{
      const { job_id } = action.data
      yield call(releaseJobPaymentApi, { job_id: job_id })
      yield put({ type: JOB_DETAIL.GET.START, data: { jobId: job_id } })
      yield put({ type: JOB_PAYMENT.POST.SUCCESS })
   }catch(e){
      yield put({ type: JOB_PAYMENT.POST.ERROR})
   }
}

function* getCluster(action){
   try{
      
      const selectedAddress = yield select(state => state.address.selectedAddress)
      const user = yield select(state => state.user.user)

      const selected = user.addresses.filter(({uid})=> uid === selectedAddress.uid)
     
      if(selected.length > 0){
         const district = selected[0].district.normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^\w\s]/gi, '').toUpperCase()
         
   
         const firestoneWrapper = firestore()
                                 .collection('jobsCluster').doc(`${district}_${action.data.item.category.category_id}`)


         const { _data } = yield call([firestoneWrapper, firestoneWrapper.get])
      

         yield put({ type: CLUSTER.GET.SUCCESS, response: _data })
      } else {
         yield put({ type: CLUSTER.GET.ERROR })
      }

      
   } catch(e){
      yield put({ type: CLUSTER.GET.ERROR })
   }
}

function* fetchVendorJobs(){
   
   try{
      const user = yield select(state => state.user.user)
      const response = yield call(fetchCompletedJobs, user.userId)
      yield put({ type: HISTORIAL_VENDOR_JOB.GET.SUCCESS, response: response.data })
   }catch(e){
      yield put({ type: HISTORIAL_VENDOR_JOB.GET.ERROR })
   }
}

function* fetchOwnerJobs(){
   try{
      const user = yield select(state => state.user.user)
      const response = yield call(fetchCompletedMeJobs, user.userId)
      yield put({ type: HISTORIAL_OWNER_JOB.GET.SUCCESS, response: response.data })
   }catch(e){
      yield put({ type: HISTORIAL_OWNER_JOB.GET.ERROR })
   }
}

function* editDateJob(action){
   try{

      const payload = {
         job_date: action.data.fromDate.getTime(),
         job_time: action.data.fromTime.getTime(),
         job_id: action.data.job.job_id,
         worker_id: action.data.job.job_vendor_id,
      }

      yield call(editJobApi, payload) 
      yield put({type: POST.SUCCESS})
   }catch(e){
      yield put({type: POST.ERROR})
   }
}

function* getCompletedMeJobsAction(){
   yield takeLatest([GET.START,DELETE.SUCCESS, FORM_JOB.POST.SUCCESS], getCompletedMeJobs)
}

function* deleteMeJobAction(){
   yield takeLatest(DELETE.START, deleteMeJob)
}

function* getCalendarJobsAction(){
   yield takeLatest(CALENDAR_JOB.GET.START, getCalendarJobs)
}

function* postJobAction(){
   yield takeLatest(FORM_JOB.POST.START, postJob)
}

function* fetchFilterJobsAction(){
   yield takeLatest(JOB.POST.START, fetchFilterJobs)
}

function* getOwnerJobDetailAction(){
   yield takeLatest(JOB_DETAIL.GET.START, getOwnerJobDetail)
}

function* changeJobStatusAction(){
   yield takeLatest(JOB_STATUS.POST.START, changeJobStatus)
}

function* changeJobWorkerStatusAction(){
   yield takeLatest(JOB_STATUS_WORKER.POST.START, changeJobWorkerStatus)
}

function* releaseJobPaymentAction(){
   yield takeLatest(JOB_PAYMENT.POST.START, releaseJobPayment)
}

function* getClusterAction(){
   yield takeEvery(CLUSTER.GET.START, getCluster)
}

function* fetchVendorJobsAction(){
   yield takeLatest(HISTORIAL_VENDOR_JOB.GET.START, fetchVendorJobs)
}

function* fetchOwnerJobsAction(){
   yield takeLatest(HISTORIAL_OWNER_JOB.GET.START, fetchOwnerJobs)
}

function* editDateJobAction(){
   yield takeLatest(POST.START, editDateJob)
}

export function* jobsActions(){
   yield all([
      getCompletedMeJobsAction(),
      deleteMeJobAction(),
      getCalendarJobsAction(),
      postJobAction(),
      fetchFilterJobsAction(),
      getOwnerJobDetailAction(),
      changeJobStatusAction(),
      changeJobWorkerStatusAction(),
      releaseJobPaymentAction(),
      getClusterAction(),
      fetchVendorJobsAction(),
      fetchOwnerJobsAction(),
      editDateJobAction()
   ])
}