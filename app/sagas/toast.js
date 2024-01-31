import { takeLatest, call } from 'redux-saga/effects'
import toast from './toast.config'
import Toast from 'react-native-toast-message'


export function* showToast(action) {
   
    try {
        if (toast[action.type]) {
            const {text1, text2} = toast[action.type]
            yield call(Toast.show, {
                topOffset: 100,
                text1,
                text2,
                props:{
                    showBorder:true
                }
               
              })
          
        }
    } catch (e) {
       
    }
}

export function* toastAction() {
    yield takeLatest(Object.keys(toast), showToast)
}
