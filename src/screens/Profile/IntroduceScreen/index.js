import { View, Text, FlatList, ScrollView } from 'react-native'
import React from 'react'

const IntroduceScreen = ({ navigation, route }) => {
  const data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
  return (
    <FlatList
      data={Array.from({ length: 50 })}
      renderItem={({ item, index }) => <Text key={index}>Item {item + 1}</Text>}
    />
  )
}

export default IntroduceScreen
