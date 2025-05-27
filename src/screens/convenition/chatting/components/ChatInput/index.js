import { Text, TextInput, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import RowComponent from '../../../../../components/RowComponent'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import styles from '../../styles'
import ImageLibrary, { openImage } from '../../../../../components/ImageLibrary'
import SpaceComponent from '../../../../../components/SpaceComponent'
import { MESSAGE_TYPE } from '../../../../../utils/Constants'
import RNFS from 'react-native-fs'
import EvilIcons from 'react-native-vector-icons/EvilIcons'
import { navigationRef } from '../../../../../store'
const ChatInput = ({ onPress }) => {
  const [message, setMessage] = useState('')
  const handleSendMessage = () => {
    if (message.trim() !== '') {
      onPress(message, MESSAGE_TYPE.TEXT)
      setMessage('')
    }
  }
  const handleTextChange = (value) => {
    setMessage(value)
  }

  const handleSendImage = async (data) => {
    const pathArr = data.map((item) => item.customPath)
    const newData = []
    for (const item of pathArr) {
      const base64 = await RNFS.readFile(item, 'base64')
      newData.push(base64)
    }
    onPress(newData, MESSAGE_TYPE.IMAGE)
  }
  const handleSendvideo = async (data) => {
    const pathArr = data.map((item) => item.customPath)
    const newData = []
    for (const item of pathArr) {
      const base64 = await RNFS.readFile(item, 'base64')
      newData.push(base64)
    }
    onPress(newData, MESSAGE_TYPE.VIDEO)
  }

  return (
    <RowComponent alignItems style={styles.chatInputContainer}>
      <SpaceComponent width={8} />
      {/* <ImageLibrary type={MESSAGE_TYPE.IMAGE} callback={handleSendImage} /> */}
      {/* <ImageLibrary type={MESSAGE_TYPE.VIDEO} callback={handleSendvideo} /> */}
      <EvilIcons
        name="chart"
        size={32}
        color={'blue'}
        onPress={() => navigationRef.navigate('CreatePollScreen')}
      />
      <Text>new text</Text>
      <SpaceComponent width={8} />
      <TextInput
        value={message}
        onChangeText={handleTextChange}
        style={styles.chatInput}
        multiline
        placeholder="Nhập tin nhắn..."
      />
      <TouchableOpacity onPress={handleSendMessage} style={styles.chatInputIcon}>
        <MaterialIcons name="send" color={'blue'} size={30} />
      </TouchableOpacity>
    </RowComponent>
  )
}

export default ChatInput
