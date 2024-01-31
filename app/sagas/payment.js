import { call, put, takeLatest, select } from 'redux-saga/effects'
import { actions } from '../redux/action'
import { addPaymentApi, verifyPaymmentApi, confirmPaymentApi, getPaymentHistorialApi } from '../api/payment'
import { aceptBidApi } from '../api/bid'
import analytics from '@react-native-firebase/analytics'

const { GET, POST } = actions('payment')
const PAYMENT_VALIDATION = actions('payment.validation')

function* addPayment(action){
   try{

    const { data } = action
  
    const user = yield select(state => state.user.user)
    const response = yield call(addPaymentApi, {
        user_id : user.userId ,
        email : user.email ,
        amount : data.counteroffer_amount,
        vendor_id: data.vendor_id,
        marketplace: data.marketplace

     })

    if(response.status === 500){
      yield put({type: POST.ERROR })
    } else {
      yield put({type: POST.SUCCESS, response: response.data})
    }

    

   } catch(e){
      yield put({type: POST.ERROR })
   }
}


export function* validationTransaction(action) {
   try {
      
      const { data } = action
      const user = yield select(state => state.user.user)
      const { id } = yield select(state => state.payment.paymentResponse)
      
      yield call(verifyPaymmentApi, {
         transanction_id: id,
      })

      yield call(confirmPaymentApi, {
         vendor_name: data.vendor_name,
         vendor_image: data.vendor_image,
         job_name: data.job_name,
         job_amount: data.counteroffer_amount,
         have_document: data.have_document,
         job_id: data.job_id,
         payment_option: 'PAYKU',
         transaction_id: id,
         user_id: user.userId
      })

      const response = yield call(aceptBidApi, {
         bid_id: data.bid_id,
         job_id: data.job_id,
      })

      const addToCartObject = {
         currency: 'CLP',
         items: [{
            item_id: data.job_id,
            item_name: data.job_name,
            item_category: 'JOB',
            price: data.counteroffer_amount
         }],
         value: data.counteroffer_amount
      }

      const analyticsWrapper = analytics()

      yield call([analyticsWrapper, analyticsWrapper.logAddToCart], addToCartObject)

      if(data.action){
         yield put({type: data.action.type, data: data.action.data})
      }

      yield put({ type: PAYMENT_VALIDATION.POST.SUCCESS })
       
   } catch (e) {
       yield put({ type: PAYMENT_VALIDATION.POST.ERROR, message: e.message })
   }
}

function* getPaymentHistorial(){
  
   try{

         const user = yield select(state => state.user.user)
         const response = yield call(getPaymentHistorialApi, user.userId)
         yield put({type: GET.SUCCESS, data: response.data })
  
     } catch(e){
        yield put({type: GET.ERROR })
     }
}

export function* addPaymentAction(){
   yield takeLatest(POST.START, addPayment)
}

export function* validationTransactionAction() {
   yield takeLatest(PAYMENT_VALIDATION.POST.START, validationTransaction)
}

export function* getPaymentHistorialAction(){
   yield takeLatest(GET.START, getPaymentHistorial)
}