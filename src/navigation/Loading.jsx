import { View, Text, ActivityIndicator } from 'react-native'
import React from 'react'
import TextComponent from '~/components/TextComponent'

const Loading = () => {
  return (
    <View style={{display:'flex', width:'100%', height:'100%', justifyContent:'center', alignItems:'center'}}>
        <View>
        <ActivityIndicator size={46} />
        <TextComponent text='Loading' size={20} />
        </View>
    </View>
  )
}

export default Loading
