import { View, Text, ActivityIndicator } from 'react-native'
import React from 'react'

const Loading = () => {
  return (
    <View
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <ActivityIndicator size={22} />
    </View>
  )
}

export default Loading
