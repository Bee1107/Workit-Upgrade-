import { call, put, takeLatest } from 'redux-saga/effects'
import { actions } from '../redux/action'
import { fetchCategories, fetchSubCategories } from '../api/categories'

const { GET  } = actions('categories')
const SUBCATEGORIES = actions('subcategories')

function* getCategories(){
   try{
     
      const response = yield call(fetchCategories)
     
      yield put({type: GET.SUCCESS, response: response.data})
  
   } catch(e){

      yield put({type: GET.ERROR, message: e.message})
   }
}


function* getSubCategories(action){
   try{

      const response = yield call(fetchSubCategories, action.data.categoryId)
  
      yield put({type: SUBCATEGORIES.GET.SUCCESS, response: response.data})
  
   } catch(e){
      yield put({type: SUBCATEGORIES.GET.ERROR, message: e.message})
   }
}


export function* getCategoriesAction(){
   yield takeLatest(GET.START, getCategories)
}

export function* getSubCategoriesAction(){
   yield takeLatest(SUBCATEGORIES.GET.START, getSubCategories)
}
