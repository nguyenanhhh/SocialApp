import { GoogleSignin } from '@react-native-google-signin/google-signin'
import { API } from '../../api'
import SocketClient from '../../socket'

import messaging from '@react-native-firebase/messaging'

async function getFCMToken() {
  const token = await messaging().getToken()
  // Lưu token lên server của bạn nếu cần
  return token
}

const configGoogleMethod = async () => {
  GoogleSignin.configure({
    webClientId: '547666553180-vq4lmq8aiqervsr8636b4ek8ccjghum9.apps.googleusercontent.com'
  })
}

const signOutWithGoogle = async () => {
  SocketClient.socket.emit('disconnection')
  await configGoogleMethod()
  GoogleSignin.signOut()
    .then((result) => {
    
      messaging().deleteToken()
    })
    .catch((error) => console.log('error when sign out', error))
}

async function signInWithGoogle() {
  await configGoogleMethod()
  await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true })

  return await GoogleSignin.signIn()
    .then(async (data) => {
      if (data.type === 'success') {
        const fcmToken = await getFCMToken()
        const userInfo = { ...data.data.user, fcmToken }
        const newUser = await API.loginAPI({ data: userInfo })
        return newUser
      }
    })
    .catch((error) => console.log('error when google signin: ', error))
}

export { signInWithGoogle, signOutWithGoogle }
