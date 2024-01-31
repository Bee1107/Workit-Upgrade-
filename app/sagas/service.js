import { call, put, takeLatest, select, all } from 'redux-saga/effects'
import { actions } from '../redux/action'
import { getPlatformPath, uploadImageToStorage } from '../utils/File'
import { getWords } from '../utils/String'
import firestore from '@react-native-firebase/firestore'
import { 
   v2PostJob, 
} from '../api/job'

import {  CITIES_CHILE  } from '../utils/constants'
import AsyncStorage from '@react-native-async-storage/async-storage'

const { POST, GET, DELETE } = actions('service')
const MY_SERVICE = actions('my.services')
const WORKER_SERVICE = actions('worker.services')
const REQUEST_SERVICE = actions('service.request')
const SEARCH_SERVICE = actions('service.search')

function* searchService(action) {
   try{

      const words = getWords(action.data.text)
      const services = []

      let firestoneWrapper = firestore()
         .collection('services')
         .where('keywords', 'array-contains-any', words)

      let firestoneWrapperWorkers = firestore()
         .collection('users')
         .where('keyword_desription', 'array-contains-any', words)
   

      const response = yield call([firestoneWrapper, firestoneWrapper.get])
      const response2 = yield call([firestoneWrapperWorkers, firestoneWrapperWorkers.get])
      
      response.forEach((doc) => {
            const docData = doc.data()

            services.push(
               {
                  id: doc.id,
                  ...docData,
                  type:'service'
               },
            )
      })

      response2.forEach((doc) => {
         const docData = doc.data()

         services.push(
            {
               id: doc.id,
               userId: doc.id,
               ...docData,
               type:'worker'
            },
         )
   })


      yield put({type: SEARCH_SERVICE.POST.SUCCESS, response: services})
   }catch(e){
      yield put({type: SEARCH_SERVICE.POST.ERROR})
   }
}

function* deleteService(action){
   try{
       const firestoneWrapper = firestore()
         .collection('services')
         .doc(action.data.id)
         
       yield call([firestoneWrapper, firestoneWrapper.delete])
       yield put({ type: DELETE.START })

   } catch(e){
      yield put({ type: DELETE.SUCCESS })
   }
}

function* getServices(action){

 
   try{
      
      const { category } = action.data

      const user = yield select(state => state.user.user )

      const firestoneWrapper = firestore()
                                  .collection('services')
                                  .where('category.category_id','==',  category.category_id)

      const response = yield call([firestoneWrapper, firestoneWrapper.get])

      const services = []

      response.forEach((doc) => {
          const docData = doc.data()
          services.push(
              {
                  id: doc.id,
                  ...docData,
              }
          )
      })

      const currentAddressString = yield call( AsyncStorage.getItem, '@selectedAddress')
      const currentAddress = JSON.parse(currentAddressString)
   
      const { addresses } = user
      const selectedAddress = addresses ? addresses.filter(({uid}) => uid === currentAddress.uid) : []

      const result =  selectedAddress
                              .map(({district}) => district)
                              .map(district => {
                                 return CITIES_CHILE.find(({comunas}) => comunas.includes(district))
                              })
                              .map(({region}) => region)

     
      const query = [...result, ...new Set(selectedAddress.map(({district}) => district).filter(item => item !== null))]
                              

      const resultFilter = query.flatMap(e => {
         return services.filter((service) => {
            return service.districts.includes(e)
         })
      })
      
      yield put({ type: GET.SUCCESS, response: [...new Set(resultFilter)]})

   }catch(e){
      yield put({ type: GET.ERROR})
   }
}

function* postService(action){
   try{
      const { data } = action
      const {  name,
         description,
         amount,
         image,
         category,
         subcategory,
         aproach,
         measure,
         districts
      } = data

      let path = ''

      if(data.image){
         path = yield call(uploadImageToStorage,  getPlatformPath(data.image).value, `services/${data.image.fileName}`)
      }
     
      const user = yield select(state => state.user.user)

      const firestoneWrapper = firestore().collection('services')

      yield call([firestoneWrapper, firestoneWrapper.add], {
         worker:{
            have_document: user.have_document,
            certificate: user.certificate ? user.certificate : false,
            email:  user.email,
            mother_last_name: user.mother_last_name,
            profile_picture: user.profile_picture,
            name: user.name,
            father_last_name: user.father_last_name,
            userId: user.userId
         },
         user_id: user.userId,
         name,
         description,
         keywords: getWords(`${name} ${description}`),
         amount,
         image,
         category,
         subcategory,
         aproach,
         measure,
         image: path,
         districts,
         createAt: new Date(),
         updateAt: new Date(),
         createAtTimeStamp: Date.now(),
     })
    
      yield put({ type: POST.SUCCESS })

   } catch(e){
      yield put({ type: POST.ERROR })
   }
}

function* requestService(action){
   try{
      const { job } = action.data
      const user = yield select(state => state.user.user)
      const address = yield select(state => state.address.selectedAddress)

      const selectedAddress = user.addresses.filter(({ uid }) => uid === address.uid)

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
            fromDate: job.fromDate.getTime(),
            toDate: job.toDate.getTime(),
            time: job.fromTime.getTime(),
            fromTime: job.fromTime.getTime(),
            toTime: job.toTime.getTime(),
            isBetween: job.isBetween,
            isBetweenHour: job.isBetweenHour,
         },
         worker_selected: job.worker_selected,
         images: [],
         address: (selectedAddress.length > 0) ? selectedAddress[0] : user.addresses[0],
         type: 'direct'
      }

      yield call(v2PostJob, payload)

      yield put({ type: REQUEST_SERVICE.POST.SUCCESS})
   } catch(e){

      yield put({ type: REQUEST_SERVICE.POST.ERROR})
   }
}

function* getMyServices(){

   try{
      
      const user = yield select(state => state.user.user)
      const firestoneWrapper = firestore()
                                  .collection('services')
                                  .where('user_id', '==', user.userId)
      const response = yield call([firestoneWrapper, firestoneWrapper.get])

      const services = []

      response.forEach((doc) => {
          const docData = doc.data()
          services.push(
              {
                  id: doc.id,
                  ...docData,
              }
          )
      })

      yield put({ type: MY_SERVICE.GET.SUCCESS, response: services})

   }catch(e){
      yield put({ type: MY_SERVICE.GET.ERROR})
   }
}

function* getWorkerServices(action){
   try{
      const firestoneWrapper = firestore()
                                  .collection('services')
                                  .where('user_id', '==', action.data.userId)

      const response = yield call([firestoneWrapper, firestoneWrapper.get])

      const services = []

      response.forEach((doc) => {
          const docData = doc.data()
          services.push(
              {
                  id: doc.id,
                  ...docData,
              }
          )
      })

      yield put({ type: WORKER_SERVICE.GET.SUCCESS, response: services})

   }catch(e){
      yield put({ type: WORKER_SERVICE.GET.ERROR})
   }
}

function* postServiceAction(){
   yield takeLatest(POST.START, postService)
}

function* getServicesAction(){
   yield takeLatest(GET.START, getServices)
}

function* deleteServiceAction(){
   yield takeLatest(DELETE.START, deleteService)
}

function* searchServiceAction(){
   yield takeLatest(SEARCH_SERVICE.POST.START, searchService)
}

function* requestServiceAction(){
   yield takeLatest(REQUEST_SERVICE.POST.START, requestService)
}

 function* getMyServicesAction(){
   yield takeLatest([MY_SERVICE.GET.START,DELETE.SUCCESS, POST.SUCCESS], getMyServices) 
}

function* getWorkerServicesAction(){
   yield takeLatest(WORKER_SERVICE.GET.START, getWorkerServices) 
}

export function* servicesAction(){
   yield all([
      postServiceAction(),
      getServicesAction(),
      deleteServiceAction(),
      searchServiceAction(),
      requestServiceAction(),
      getMyServicesAction(),
      getWorkerServicesAction()
   ])
}