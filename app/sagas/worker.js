import { call, put, takeLatest, select, all } from 'redux-saga/effects'
import { actions } from '../redux/action'
import { v2BecomeWorker } from '../api/user'
import { getPlatformPath, getFileName, uploadImageToStorage } from '../utils/File'
import firestore from '@react-native-firebase/firestore'

const { POST, GET} = actions('worker')
const { SELECT } = actions('user')

function* getWorkers(action){
    
    try {
        let firestoneWrapper = firestore()
                                    .collection('users')
                                    .where('myCategoriesIds', 'array-contains', action.data.category.category_id)
                                    .limit(100)

                                
        const response = yield call([firestoneWrapper, firestoneWrapper.get])

        const workers = []
       
        response.forEach((doc) => {
            const docData = doc.data()
            workers.push(
                {
                    id: doc.id,
                    ...docData,
                },
            )           
        })


        yield put({ type: GET.SUCCESS, response: workers })
    } catch (e) {
        yield put({ type: GET.ERROR, message: e.message })
    }
}

function* becomeWorker(action){
   try{

    const files = [
        {
            uri: action.data.frontImage,
            path: action.data.frontImage,
            fileName: action.data.frontImage.split('/').pop(),
            folder: 'id_images'
        },
        {
            uri: action.data.backImage,
            path: action.data.backImage,
            fileName: action.data.backImage.split('/').pop(),
            folder: 'id_images'
        }
    ]

    if(action.data.backgroundDocument){
        files.push({
            uri: action.data.backgroundDocument.uri,
            path: action.data.backgroundDocument.uri,
            fileName: action.data.backgroundDocument.uri.split('/').pop(),
            folder: 'document'
        })
    }
   
    const user = yield select(state => state.user.user)
    const responseFiles = yield all(
        files
        .map(data => ({
            value: getPlatformPath(data).value,
            fileName: getFileName(data.fileName, getPlatformPath(data).value),
            folder: data.folder
        }))
        .map(({ value, fileName, folder }) => uploadImageToStorage(value, `${folder}/${fileName}`)))
 

      const payload = {
        id_number: action.data.rut,
        id_image1: responseFiles[0],
        id_image2: responseFiles[1],
        user_id: user.userId,
        phone: action.data.phone,
        background_document: responseFiles[2] ? responseFiles[2] : ''
      }

      const worker = yield select(state => state.user.user)

      yield call(v2BecomeWorker, payload)
      yield put({type: SELECT.START, data: worker})
      yield put({ type: POST.SUCCESS })
      
      
   } catch(e){
      yield put({ type: POST.ERROR })
   }
}


export function* becomeWorkerAction(){
   yield takeLatest(POST.START, becomeWorker)
}

export function* getWorkersAction(){ 
    yield takeLatest(GET.START, getWorkers)
}

function* updateWorker(action) {
    try{
        const firestoneWrapper = firestore().collection('users').doc(action.data.user.id)
        yield call([firestoneWrapper, firestoneWrapper.update], { 
            updated_at:  Date.now(),
            myCategoriesIds: [action.data.category.category_id],
            myCategories: [
                {
                    category: action.data.category,
                    image: action.data.category.image,
                    name: action.data.category.category_name,
                    subcategory: null
                }
            ]
        })
    }catch(e){

    }
}

export function* updateWorkerAction(){
    yield takeLatest('UPDATE_WORKER', updateWorker)
}