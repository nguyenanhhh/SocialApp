import { Image, TouchableOpacity } from 'react-native'
import React from 'react'

const AvatarComponent = ({ source, style, onPress, size }) => {
  const localStyle = {
    borderColor: '#fff',
    borderWidth: 1,
    width: size || 48,
    height: size || 48,
    borderRadius: 75
  }

  return (
    <TouchableOpacity onPress={onPress}>
      <Image source={{ uri: source }} style={[localStyle, style]} />
    </TouchableOpacity>
  )
}

export default AvatarComponent
