
import * as React from 'react'
import { StackActions } from '@react-navigation/native'
export const navigationRef = React.createRef()

export function navigate(name, params = {}) {
  navigationRef.current?.navigate(name, params)
}

export function replace(name, params = {}){
  navigationRef.current?.dispatch(
    StackActions.replace(name, params)
  )
}

export function goBack(){
  navigationRef.current?.goBack()
}

export function goBackAbsolute(){

  navigationRef.current?.dispatch(
    StackActions.popToTop()
  )

  navigationRef.current?.goBack(null)
}