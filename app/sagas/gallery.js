import { call, put, takeLatest, select } from 'redux-saga/effects'
import firestore from '@react-native-firebase/firestore'
import { actions } from '../redux/action'
import { getPlatformPath, getFileName, uploadImageToStorage } from '../utils/File'

const {
    PUSH,
    SORT
} = actions('gallery')

const { GET } = actions('user')

function* uploadPhoto(action) {
    try {
        const { data } = action
        const {image} = data
       
        const job_image = yield call(uploadImageToStorage, getPlatformPath(image).value, `job_images/${getFileName(image.fileName, getPlatformPath(image).value)}`)

 
        const user = yield select(state => state.user.user)

        const new_images = [...user.work_images, ...[job_image]]
        const firestoneWrapper = firestore().collection('users').doc(user.userId)
    
        yield call([firestoneWrapper, firestoneWrapper.update], { work_images: new_images })
        yield put({ type: PUSH.SUCCESS })
        yield put({ type: GET.START })

    } catch (e) {
        yield put({ type: PUSH.ERROR })
    }
}

function* sortGallery(action) {


    try {
        const { data } = action
 
        const user = yield select(state => state.user.user)

        const firestoneWrapper = firestore().collection('users').doc(user.userId)
    
        yield call([firestoneWrapper, firestoneWrapper.update], { work_images: data })
        
        yield put({ type: SORT.SUCCESS })
        yield put({ type: GET.START })

    } catch (e) {
        yield put({ type: SORT.ERROR })
    }
}

export function* uploadPhotoAction() {
    yield takeLatest(PUSH.START, uploadPhoto)
}

export function* sortGalleryAction() {
    yield takeLatest(SORT.START, sortGallery)
}

