import AsyncStorage from '@react-native-async-storage/async-storage'
import { signOutWithGoogle } from '~/screens/auth/signinMethod'

const { createSlice, createAsyncThunk } = require('@reduxjs/toolkit')
const { default: axiosInstance } = require('~/utils/axiosInstance')
const { SERVER_POST, SERVER_ADDRESS } = require('~/utils/Constants')

const initialValue = {
  currentUser: null
}

const login = createAsyncThunk('/user/login', async (data) => {
  const response = await axiosInstance.post(`${SERVER_ADDRESS}/v1/users`, data)
  return response.data
})

const logout = createAsyncThunk('/user/logout', async () => {
  await signOutWithGoogle()
  await AsyncStorage.removeItem('user')
  return null
})

const update = createAsyncThunk('/user/update', async ({ userId, data }) => {
  const response = await axiosInstance.post(`${SERVER_ADDRESS}/v1/users/${userId}`, data)
  return response.data
})

const userSlice = createSlice({
  name: 'user',
  initialState: initialValue,
  reducers: {
    loginCurrentUser: function (state, action) {
      state.currentUser = action.payload
    },
    updateCurrentUser: function (state, action) {
      Object.keys(action.payload).forEach((key) => {
        state.currentUser[key] = action.payload[key]
      })
    }
  },
  extraReducers: (builder) => {
    builder.addCase(login.fulfilled, (state, action) => {
      state.currentUser = action.payload
    })
    builder.addCase(logout.fulfilled, (state, action) => {
      state.currentUser = null
    })
    builder.addCase(update.fulfilled, (state, action) => {
      state.currentUser = action.payload
    })
  }
})

export const selectCurrentUser = (state) => state.user.currentUser
export const userReducer = userSlice.reducer
export const userAction = userSlice.actions
export const userAsyncAction = {
  login,
  logout,
  update
}
