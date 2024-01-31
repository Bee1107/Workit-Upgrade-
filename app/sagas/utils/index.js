import auth from '@react-native-firebase/auth'
import { LoginManager, AccessToken } from 'react-native-fbsdk-next'
import { appleAuth } from '@invertase/react-native-apple-authentication'
import { GoogleSignin } from '@react-native-google-signin/google-signin'

GoogleSignin.configure({
    webClientId:''
})

async function facebookConnect() {
    const result = await LoginManager.logInWithPermissions(['public_profile', 'email'])

    if (result.isCancelled) {
        throw 'User cancelled the login process'
    }

    const data = await AccessToken.getCurrentAccessToken()

    if (!data) {
        throw 'Something went wrong obtaining access token'
    }

    const facebookCredential = auth.FacebookAuthProvider.credential(data.accessToken)
    return auth().signInWithCredential(facebookCredential)
}

async function appleConnect() {
    const appleAuthRequestResponse = await appleAuth.performRequest({
        requestedOperation: appleAuth.Operation.LOGIN,
        requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
    })

    if (!appleAuthRequestResponse.identityToken) {
        throw 'Apple Sign-In failed - no identify token returned'
    }

    const { identityToken, nonce } = appleAuthRequestResponse
    const appleCredential = auth.AppleAuthProvider.credential(identityToken, nonce)

    return auth().signInWithCredential(appleCredential)
}


async function googleConnect() {

  const { idToken } = await GoogleSignin.signIn()

  const googleCredential = auth.GoogleAuthProvider.credential(idToken)

  return auth().signInWithCredential(googleCredential)
}

export default {
    facebookConnect,
    appleConnect,
    googleConnect
}
