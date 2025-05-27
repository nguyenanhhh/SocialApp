import { View, Text, StyleSheet, Alert } from 'react-native'
import React, { useState } from 'react'
import RowComponent from '../../../../../../../components/RowComponent'
import ChatAvatar from '../ChatAvatar'
import { helper } from '../../../../../../../utils/helpers'
import SpaceComponent from '../../../../../../../components/SpaceComponent'
import { API } from '../../../../../../../api'

const TextMessage = React.memo(
  ({
    _id,
    senderID,
    onLayout,
    index,
    message,
    style,
    owner,
    aka,
    time,
    messageTime,
    avatar,
    onLongPress,
    detail
  }) => {
    const [isPressed, setIsPressed] = useState(false)
    const handlePress = () => {
      setIsPressed(!isPressed)
    }
    const formatTime = time ? helper.DateTimeHelper.displayTimeDescendingFromDate(time) : null
    const formatMessageTime = helper.DateTimeHelper.displayTimeDescendingFromDate(messageTime)

    const handleLongPress = () => {
      onLongPress(detail)
    }

    return (
      <View onLayout={(event) => onLayout(event.nativeEvent.layout.height, index)}>
        {time && (
          <View>
            <SpaceComponent height={8} />
            <Text style={{ textAlign: 'center', width: '100%' }}>{formatTime}</Text>
            <SpaceComponent height={4} />
          </View>
        )}
        {aka && (
          <View>
            <RowComponent>
              <ChatAvatar source={null} size={32} />
              <Text>{aka}</Text>
            </RowComponent>
          </View>
        )}
        <RowComponent
          alignItems
          onLongPress={handleLongPress}
          onPress={handlePress}
          style={owner ? styless.ownerContainer : styless.userContainer}
        >
          {!owner && <ChatAvatar avatar={API.getFileUrl(avatar)} size={30} />}
          <Text style={owner ? styless.ownerTextMessage : styless.userTextMessage}>{message}</Text>
          {isPressed && !time && (
            <View style={{ marginHorizontal: 8 }}>
              <SpaceComponent width={8} />
              <Text style={{ fontSize: 12 }}>{formatMessageTime}</Text>
              <SpaceComponent width={8} />
            </View>
          )}
        </RowComponent>
      </View>
    )
  }
)

export default TextMessage
const styless = StyleSheet.create({
  userTextMessage: {
    color: '#000',
    fontSize: 18,
    fontWeight: '400',
    backgroundColor: '#ccc',
    paddingHorizontal: 16,
    paddingVertical: 4,
    borderRadius: 15
  },
  ownerTextMessage: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '400',
    backgroundColor: 'blue',
    paddingHorizontal: 16,
    paddingVertical: 4,
    borderRadius: 15
  },
  ownerContainer: {
    // justifyContent: 'flex-end'
    flexDirection: 'row-reverse'
  },
  userContainer: {
    // justifyContent: 'flex-start'
  }
})
