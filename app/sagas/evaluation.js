import { call, put, takeLatest, select, delay } from 'redux-saga/effects'
import { actions } from '../redux/action'
import { fetchRatings } from '../api/evaluation'
import firestore from '@react-native-firebase/firestore'

const { GET } = actions('evaluation')
const EVAL_JOBS = actions('job.eval')
const USER = actions('user')
const EVAL_USER = actions('user_eval')
const JOB_STATUS_WORKER = actions('jobs.worker.status')
const JOB_PAYMENT = actions('job.payment')

function* postRating(action){
   try{
      
      const { eval1, eval2, eval3, omitted, type,rate_to, rate_from, job, comment } = action.data
      const total = (eval1 + eval2 + eval3)/3

      const userFieldUpdateCount = type === 'worker' ? 'worker_count' : 'client_count'
      const userFieldUpdateRating = type === 'worker' ? 'worker_rating' : 'client_rating'
      const jobFieldUpdateType = type === 'worker' ? 'work_eval' : 'user_eval'

      if(!omitted){
         const firestoneWrapper = firestore().collection('users').doc(rate_to.user_id)
         yield call([firestoneWrapper, firestoneWrapper.update], {
            [userFieldUpdateCount]: firestore.FieldValue.increment(1),
            [userFieldUpdateRating]: firestore.FieldValue.increment(total),
         })
      }
     
      const firestoneWrapperJob = firestore().collection('jobs').doc(job.id)
      yield call([firestoneWrapperJob, firestoneWrapperJob.update], {
         [jobFieldUpdateType]: true
      })

      if(!omitted){
         const firestoneWrapper = firestore().collection('ratings')

         yield call([firestoneWrapper, firestoneWrapper.add], {
            eval1, 
            eval2, 
            eval3, 
            type,
            rate_to, 
            rate_from,
            rate_from_id: rate_from.user_id,
            rate_to_id: rate_to.user_id,
            job,
            comment,
            createAt: new Date(),
            updateAt: new Date(),
        })
      }
     
      yield put({type: EVAL_JOBS.POST.SUCCESS })
   }catch(e){

      yield put({type: EVAL_JOBS.POST.ERROR })
   }
}

function* getJobDontEval(){
 
   try{

      yield delay(1000)
      const user = yield select(state => state.user.user)
                                  
      const firestoneWrapper = firestore()
                                 .collection('jobs')
                                 .where('user_id', '==', user.userId)  
                                 .where('status', '==', 'PAID')
                                 .where('work_eval', '==', false)
                                 
      const firestoneWrapperVendor = firestore()
                                 .collection('jobs')
                                 .where('job_vendor_id', '==', user.userId)  
                                 .where('status', '==', 'PAID')
                                 .where('user_eval', '==', false)

      const response = yield call([firestoneWrapper, firestoneWrapper.get])
      const responseVendor = yield call([firestoneWrapperVendor, firestoneWrapperVendor.get])

      const data = []

      response.forEach((doc) => {
         const docData = doc.data()
         data.push(
         {
            id: doc.id,
            ...docData,
         })
      })

      responseVendor.forEach((doc) => {
         const docData = doc.data()
         data.push(
         {
            id: doc.id,
            ...docData,
         })
      })

      if(data.length > 0){

         const { user_id, job_vendor_id }  = data[0]

         const rate_from = {
            name: user.name,
            father_last_name: user.father_last_name,
            mother_last_name: user.mother_last_name,
            profile_picture: user.profile_picture,
            user_id: user.userId
         }

         const rate_to = user.userId === user_id ? { user_id : job_vendor_id } : { user_id }

         const type = user.userId === user_id ? 'worker' : 'client'

         yield put({type: EVAL_JOBS.GET.SUCCESS, params: {
            job: data[0],
            rate_from,
            rate_to,
            type
         }})
      }

      
   }catch(e){

      yield put({type: EVAL_JOBS.GET.ERROR })
   }
}

function* getRatings(action){
   try{
      
      const user = yield select(state => state.user.user)
      const response = yield call(fetchRatings, user.userId, action.data.type)
      yield put({type: GET.SUCCESS, response: response.data})
     
   } catch(e){
      yield put({type: GET.ERROR, message: e.message})
   }
}

function* getEvaluationUser(action){


   try{

      const firestoneWrapper = firestore()
                                 .collection('ratings')
                                 .where('rate_to_id', '==',  action.data.userId)  
     
      const response = yield call([firestoneWrapper, firestoneWrapper.get])
                               
      const data = []
                           
      response.forEach((doc) => {
         const docData = doc.data()
         data.push(
         {
            id: doc.id,
            ...docData,
         })
      })
                            
      yield put({type: EVAL_USER.GET.SUCCESS, data})
                    
   }catch(e){
      yield put({type: EVAL_USER.GET.ERROR})
   }
}


export function* getRatingsAction(){
   yield takeLatest([GET.START], getRatings)
}

export function* getJobDontEvalAction(){
   yield takeLatest(EVAL_JOBS.GET.START, getJobDontEval)
}

export function* postRatingAction(){
   yield takeLatest([
      EVAL_JOBS.POST.START, 
      JOB_STATUS_WORKER.POST.SUCCESS, 
      JOB_PAYMENT.POST.SUCCESS], 
      postRating)
}

export function* getEvaluationUserAction(){
   yield takeLatest(USER.SELECT.START, getEvaluationUser)
}