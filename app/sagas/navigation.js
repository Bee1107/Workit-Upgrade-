import { call, select, takeLatest, delay } from 'redux-saga/effects'
import {routes} from './navigation.config'
import {
    navigate, replace, goBack, goBackAbsolute,
} from '../navigation/rootNavigation'

const map = {
    replace, navigate, goBack, goBackAbsolute,
}

export function* navigateApp(action) {
   

    try {
      
        if (routes[action.type]) {
            const user = yield select(state => state.user.user)
            const currentRoute = yield call(routes[action.type].route, user)

            yield call(map[routes[action.type].type], currentRoute, action.params)

            console.log('->navigate',action.type)
           
            if(routes[action.type].next !== undefined){

                yield delay(500)
                const user2 = yield select(state => state.user.user)
                const currentRoute2 = yield call(routes[action.type].next.route, user2)
              
                yield call(map[routes[action.type].next.type], currentRoute2, action.params)
            }

        }
    } catch (e) {
       
    }
}

export function* navigateAction() {
    yield takeLatest(Object.keys(routes), navigateApp)
}
