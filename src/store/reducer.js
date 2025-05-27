import { signOutWithGoogle } from '../screens/auth/signinMethod'
import { LOGIN, LOGOUT, SIGNIN } from './constants'
const user = null
const reducer = (state, action) => {
  switch (action.type) {
    case LOGIN:
      return { ...action.payload }
    case LOGOUT: {
      signOutWithGoogle()
      return {}
    }
    case SIGNIN:
      return { ...action.payload }
    default:
      throw new Error('Error invalid action')
  }
}

export default user
export { reducer }
