import { LOGIN, LOGOUT, SIGNIN } from './constants'
const onLogin = (payload) => {
  return {
    type: LOGIN,
    payload
  }
}

const onLogout = () => {
  return {
    type: LOGOUT,
    payload: null
  }
}

const onSignIn = (payload) => {
  return {
    type: SIGNIN,
    payload
  }
}

export const actions = { onLogin, onLogout, onSignIn }
