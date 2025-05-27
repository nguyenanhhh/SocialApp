import { Image } from 'react-native'
import React from 'react'

const ImageRenderComponent = ({ source, style }) => {
  return source ? <Image source={{ uri: source }} style={style} /> : <></>
}

export default ImageRenderComponent
