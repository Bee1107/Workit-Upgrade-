import { call, put, takeLatest, select } from 'redux-saga/effects'
import { actions } from '../redux/action'
import firestore from '@react-native-firebase/firestore'
import { getFixedNow } from '../utils/date'
import { sumStats, getTodayData } from '../utils/stats'

const { GET } = actions('stats')

function* getStats(){

   try{
      const user = yield select(state => state.user.user)
      const firestoneWrapper =  firestore()
                                .collection('jobStat')
                                .where('userId', '==', user.userId)       
                                .where('timeStamp', '>=', getFixedNow())
                                         
      const response = yield call([firestoneWrapper, firestoneWrapper.get])

      const stats = []

      response.forEach((doc) => {
          const docData = doc.data()
          stats.push(
              {
                  id: doc.id,
                  ...docData,
              }
          )
      })

      const revenue = stats.filter(({type}) => type==='REVENUE')
      const revenue_global_data = stats.filter(({type}) => type==='GLOBAL_REVENUE')

      const place_bid_data = stats.filter(({type}) => type==='PLACE_BID')
      const place_bid_global_data = stats.filter(({type}) => type==='GLOBAL_PLACE_BID')
      
      const work_data = stats.filter(({type}) => type==='WORK')
      const work_global_data = stats.filter(({type}) => type==='GLOBAL_WORK')
     
      const place_bid = sumStats(place_bid_data)
      const work = sumStats(work_data)
      const effectiveness = place_bid === 0 ? 0 : work / place_bid
      const todayRevenue = sumStats(getTodayData(revenue))

      const effectiveness_global = (place_bid_global_data.length === 0) ? 0 : (work_global_data[0].value / place_bid_global_data[0].value)
      const average_revenue = (work_global_data.length === 0 || revenue_global_data.length === 0) ? 0 : (revenue_global_data[0].value / work_global_data[0].value)

      const effectiveness_data = work_data.map((e, index) => ({
         value: (place_bid_data.length ===0 || place_bid_data[index].value === 0) ? 0 : e.value / place_bid_data[index].value,
         date: e.date,
         timeStamp: e.timeStamp
      }))

      yield put({ 
         type: GET.SUCCESS, 
         response: revenue, 
         effectiveness, 
         todayRevenue, 
         effectiveness_data,
         effectiveness_global,
         average_revenue,
         works: work_data
      })

   }catch(e){
      yield put({ type: GET.ERROR})
   }
}

export function* getStatsAction(){
   yield takeLatest(GET.START, getStats)
}

