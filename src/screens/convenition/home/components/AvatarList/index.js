import { View, Text, FlatList } from 'react-native'
import React from 'react'
import AvatarComponent from '../../../../../components/AvatarComponent'

const AvatarItem = ({ avatar, name }) => {
  return (
    <View>
      <AvatarComponent size={24} source={avatar} />
      <Text style={{ width: 24 }}>{name}</Text>
    </View>
  )
}
const AvatarList = ({ data }) => {
  return (
    <FlatList
      data={data}
      renderItem={(item, index) => (
        <AvatarItem key={index} avatar={item.avatar} name={item.aka || item.userName} />
      )}
    />
  )
}

export default AvatarList
