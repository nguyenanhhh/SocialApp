import { GestureHandlerRootView } from 'react-native-gesture-handler'
import React from 'react'
import Navigation from '~/navigation'
import { reduxStore } from '~/redux/store'
import { Provider } from 'react-redux'
import { LogBox } from 'react-native'

LogBox.ignoreAllLogs(true)
const App = () => {
  return (
    <GestureHandlerRootView>
      <Provider store={reduxStore}>
        <Navigation />
      </Provider>
    </GestureHandlerRootView>
  )
}

export default App
