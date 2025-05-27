import React from 'react'
import { TouchableOpacity, PermissionsAndroid, Alert, Text, Pressable } from 'react-native'
import { launchImageLibrary } from 'react-native-image-picker'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { MESSAGE_TYPE } from '../../utils/Constants'
import SpaceComponent from '../SpaceComponent'

const openImage = async ({ callback, limit }) => {
  try {
    const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.CAMERA)
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      const result = await launchImageLibrary({
        mediaType: 'photo',
        selectionLimit: limit ?? 0,
        includeExtra: true
      })
      if (result.assets.length > 0) {
        const imageArr = []
        for (const item of result.assets) {
          imageArr.push({
            name: item.fileName,
            uri: item.uri,
            customPath: item.uri.replace('file://', ''),
            size: item.fileSize,
            type: item.type,
            originPath: item.originalPath,
            timestamp: item.timestamp
          })
        }
        callback(imageArr.sort((a, b) => a.timestamp < b.timestamp))
      }
    } else {
      Alert.alert('Chưa cấp quyền')
    }
  } catch (err) {
    console.log(err)
  }
}

const openVideo = async ({ callback, limit }) => {
  try {
    const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.CAMERA)
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      const result = await launchImageLibrary({
        mediaType: 'video',
        selectionLimit: limit ?? 0,
        includeExtra: true
      })
      const imageArr = []
      if (result.assets.length > 0) {
        for (const item of result.assets) {
          imageArr.push({
            name: item.fileName,
            uri: item.uri,
            customPath: item.uri.replace('file://', ''),
            size: item.fileSize,
            type: item.type,
            originPath: item.originalPath,
            timestamp: item.timestamp
          })
        }
        callback(imageArr.sort((a, b) => a.timestamp < b.timestamp))
      }
    } else {
      Alert.alert('Chưa cấp quyền')
    }
  } catch (err) {
    console.log(err)
  }
}

const openMixed = async ({ callback, limit }) => {
  try {
    const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.CAMERA)
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      const result = await launchImageLibrary({
        mediaType: 'mixed',
        selectionLimit: limit ?? 0,
        includeExtra: true
      })
      const imageArr = []
      if (result.assets.length > 0) {
        for (const item of result.assets) {
          imageArr.push({
            name: item.fileName,
            uri: item.uri,
            customPath: item.uri.replace('file://', ''),
            type: item.type
          })
        }
        callback(imageArr.sort((a, b) => a.timestamp < b.timestamp))
      }
    } else {
      Alert.alert('Chưa cấp quyền')
    }
  } catch (err) {
    console.log(err)
  }
}

const ImageLibrary = ({
  children,
  callback,
  type,
  text,
  textStyle,
  spacing,
  iconSize,
  iconColor,
  limit
}) => {
  const customProps = {}
  const handleOpenPhoto = () => {
    openImage({ callback, limit })
  }
  const handleOpenVideo = () => {
    openVideo({ callback, limit })
  }
  const handleMixed = () => {
    openMixed({ callback, limit })
  }
  switch (type) {
    case MESSAGE_TYPE.IMAGE: {
      customProps.name = 'photo-library'
      customProps.onPress = handleOpenPhoto
      break
    }
    case MESSAGE_TYPE.VIDEO: {
      customProps.name = 'video-library'
      customProps.onPress = handleOpenVideo
      break
    }
    case MESSAGE_TYPE.MIX: {
      customProps.name = 'photo-library'
      customProps.onPress = handleMixed
      break
    }
    default: {
      customProps.name = 'photo-library'
      customProps.onPress = handleOpenPhoto
      break
    }
  }

  return (
    <TouchableOpacity
      onPress={customProps.onPress}
      style={{ flexDirection: 'row', alignItems: 'center' }}
    >
      {children ? (
        children
      ) : (
        <MaterialIcons
          name={customProps.name}
          size={iconSize ?? 32}
          color={iconColor ?? 'blue'}
          onPress={customProps.onPress}
        />
      )}
      <SpaceComponent width={spacing ?? 16} />
      <Text style={textStyle}>{text}</Text>
    </TouchableOpacity>
  )
}

export default ImageLibrary
export { openImage }
