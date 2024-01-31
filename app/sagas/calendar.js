import { call, put, takeLatest, select } from 'redux-saga/effects'
import { actions } from '../redux/action'
import { getCalendar } from '../api/user'

const { GET  } = actions('calendar')

function* getUserCalendar(action){
  
   try{

      const { date } = action.data
      const user = yield select(state => state.user.user)

      const response = yield call(getCalendar, { date, userId: user.userId })

      
      yield put({ type: GET.SUCCESS, response: response.data  })

   }catch(e){
      yield put({ type: GET.ERROR })
   }
}

export function* getUserCalendarAction(){
   yield takeLatest(GET.START, getUserCalendar)
}

