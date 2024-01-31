import { call, put, takeLatest, select, all } from 'redux-saga/effects'
import { actions } from '../redux/action'
import { placeBidApi, cancelBidApi, getAllBidApi, rejectBidApi, getSingleBidApi } from '../api/bid'
import { getRating } from '../utils/number'

const { POST, GET, DELETE } = actions('bid')
const SINGLE_BID = actions('single.bid')
const OWNER_BID = actions('owner.bid')
const JOB_DETAIL = actions('jobDetail')

function* getAllBid(action){
    try{
        const user = yield select(state => state.user.user)
        const response = yield call(getAllBidApi, { userId: user.userId, type: action.data.type})
        yield put({type: GET.SUCCESS, response: response.data})
    }catch(e){
        yield put({type: GET.ERROR})
    }
}
function* placeBid(action){
    try{

        const { 
            job,
            bid
        } = action.data
        
        const user = yield select(state => state.user.user)

        const payload = {
            job_id: job.job_id,
            job_name: job.job_name,
            category_name: 'category_name',
            subcategory_name: 'subcategory_name',
            user_id: job.user.userId,
            user_name: `${job.user.name} ${job.user.father_last_name} ${job.user.mother_last_name}` ,
            user_image:  job.user.profile_picture ,
            /* */
            counteroffer_amount: bid.counteroffer_amount ,
            comment: bid.comment,
            deliveryTime: bid.deliveryTime,
            deliveryTimeMeasure: bid.deliveryTimeMeasure,
            type: bid.type,
            bidDate: bid.bidDate,
            bidTime: bid.bidTime,
            /* */
            vendor_name: `${user.name} ${user.father_last_name} ${user.mother_last_name}`,
            vendor_image: user.profile_picture,
            vendor_id: user.userId,
            vendor_images: [],
            vendor_description: user.profile_description,
            marketplace: user.marketplace,
            average_rating: parseFloat(getRating(user)),
            have_document: job.user.have_document,
            have_vendor_document:  user.background_document !== ''
        }

        
        const response = yield call(placeBidApi, payload)

        if(response.status === 400){
            yield put({type: POST.ERROR, message: e.message})
        } else {
            yield put({type: POST.SUCCESS })
            yield put({type: JOB_DETAIL.GET.START, data: {jobId: job.job_id}})
        }      
    
    } catch(e){
        yield put({type: POST.ERROR, message: e.message})
    }
}

function* deleteBid(action){
    
    try{
        const { data } = action

        yield call(rejectBidApi, data)

        yield put({type: DELETE.SUCCESS})
        yield put({type: JOB_DETAIL.GET.START, data: {jobId: data.job_id}})
    }catch(e){
        yield put({type: DELETE.ERROR})
    }
}

function* cancelBid(action){
    try{
         yield call(cancelBidApi,{ bid_id: action.data.bid_id})
        yield put({type: OWNER_BID.DELETE.SUCCESS})
    }catch(e){
        yield put({type: OWNER_BID.DELETE.ERROR})
    }
}

function* getSingleBid(action){
    try{
        const response = yield call(getSingleBidApi, action.data.bid_id)
        if(response.status === 200){
            yield put({type: SINGLE_BID.GET.SUCCESS, response: response.data})
        }
        
   }catch(e){
       yield put({type: SINGLE_BID.GET.ERROR})
   } 
}

function* placeBidAction(){
    yield takeLatest(POST.START, placeBid)
}

function* cancelBidAction(){
    yield takeLatest(OWNER_BID.DELETE.START, cancelBid)
}

function* getAllBidAction(){
    yield takeLatest(GET.START, getAllBid)
}

function* deleteBidAction(){
    yield takeLatest(DELETE.START, deleteBid)
}

function* getSingleBidAction(){
    yield takeLatest(SINGLE_BID.GET.START, getSingleBid)
}

export function* bidActions(){
    yield all([
        placeBidAction(),
        getAllBidAction(),
        deleteBidAction(),
        cancelBidAction(),
        getSingleBidAction()
    ])
}