import { View, Text } from 'react-native'
import React, { useState } from 'react'
import UserMessage from '../UserMessage'
import OwnerMessage from '../OwnerMessage'
import { helper } from '../../../../../utils/helpers'
import SpaceComponent from '../../../../../components/SpaceComponent'
import { CHAT_ITEM_TYPE, MESSAGE_TYPE } from '../../../../../utils/Constants'

const SingleMessage = ({ message, avatar, messageTime, time, itemType, messageType }) => {
  const formatTime = helper.DateTimeHelper.displayTimeDescendingFromDate(messageTime)
  const textStyle = {
    textAlign: 'center'
  }

  const formatMessageTime = helper.DateTimeHelper.displayTimeDescendingFromDate(messageTime)
  const [isPressed, setIsPressed] = useState(false)
  const handlePress = () => {
    setIsPressed(!isPressed)
  }
  return itemType === CHAT_ITEM_TYPE.USER_MESSAGE ? (
    <View>
      {time && <Text style={textStyle}>{formatTime}</Text>}
      {isPressed && !time && <Text style={{ textAlign: 'center' }}>{formatMessageTime}</Text>}
      <UserMessage messageType={messageType} onPress={handlePress} message={message} avatar={chatAvatar} time={time} />
    </View>
  ) : (
    <View>
      {time && <Text style={textStyle}>{formatTime}</Text>}
      {isPressed && !time && <Text style={{ textAlign: 'center' }}>{formatMessageTime}</Text>}
      <OwnerMessage messageType={messageType} onPress={handlePress} message={message} time={time} />
    </View>
  )
}

export default SingleMessage
