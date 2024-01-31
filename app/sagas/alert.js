import {takeLatest, call, delay} from 'redux-saga/effects'
import {navigate, replace, goBack} from '../navigation/rootNavigation'
import {Alert} from 'react-native'
import {alertConfig} from './alert.config'

const map = {replace, navigate, goBack};

const wrappedAlert = ({message, title}) =>
  new Promise((resolve) => {
    Alert.alert(
      title,
      message,
      [
        {
          text: 'Ok',
          onPress: () => resolve(true),
        },
      ],
      {cancelable: false, onDismiss: () => resolve()},
    )
  })

function* detectAlert(action) {
  try {
    const config = alertConfig[action.type]

    if (config) {
      yield delay(300);
      config.message =  config.getMessage (action.message)

      yield call(wrappedAlert, config)
    }
  } catch (e) {
  }
}

export function* alertAction() {
  yield takeLatest('*', detectAlert)
}
