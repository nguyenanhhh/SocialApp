import { TouchableOpacity, Image } from 'react-native'
import React from 'react'

const ImagePressable = ({
  style,
  containerStyle,
  source,
  onPress,
  width,
  height
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{ width: width ?? 100, height: height ?? 100, marginHorizontal:2, marginVertical: 2, ...containerStyle }}
    >
      <Image
        source={{ uri: source }}
        style={{ width: '100%', height: '100%', ...style }}
      />
    </TouchableOpacity>
  )
}

export default ImagePressable
