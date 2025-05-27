import { View, Text } from 'react-native'
import React, { useState } from 'react'
import WebView from 'react-native-webview'
import GoBackComponent from '../../components/GoBackComponent'

const WebViewScreen = ({ navigation, route }) => {
  const [uri, setUri] = useState('')
  return (
    <View style={{ flex: 1 }}>
        <GoBackComponent title={route.params?.title} />
      <WebView source={{ uri: route.params.uri }} style={{ flex: 1 }}
      onShouldStartLoadWithRequest={(request) => {
        // Luôn cho phép tải các URL trong WebView
        console.log('current link: ', request.url)
        // navigation.navigate('WebViewScreen', {uri: request.url} )

        // Đảm bảo các URL được mở trong WebView
        return true;
      }}
      />
    </View>
  )
}

export default WebViewScreen
