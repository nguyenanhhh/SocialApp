const { configureStore } = require('@reduxjs/toolkit')
const { userReducer } = require('./slice/userSlice')

export const reduxStore = configureStore({
  reducer: {
    user: userReducer
  }
})
