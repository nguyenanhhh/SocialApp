import { View, Text } from 'react-native'
import React from 'react'
import { helper } from '../../../../../../../utils/helpers'
import { MESSAGE_TYPE } from '../../../../../../../utils/Constants'
import VideoMessage from '../VideoMessage'
import ImageMessage from '../ImageMessage'
import TextMessage from '../TextMessage'
import { API } from '~/api'

const ChatItem = React.memo(
  ({ item, index, onLayout, members, ownerID, beforeItem, onLongPress }) => {
    const boolCheckOwner = item.senderID === ownerID ? true : false
    var messageType = TextMessage
    switch (item.type) {
      case MESSAGE_TYPE.TEXT:
        messageType = TextMessage
        break
      case MESSAGE_TYPE.IMAGE:
        messageType = ImageMessage
        break
      case MESSAGE_TYPE.VIDEO:
        messageType = VideoMessage
        break
    }
    const config = {
      _id: item._id,
      senderID: item.senderID,
      style: boolCheckOwner ? {} : {},
      // avatar: !boolCheckOwner ? API.getFileUrl(members.get(item.senderID)?.avatar) : '',
      avatar: !boolCheckOwner ? members.get(item.senderID)?.avatar : '',
      messageType: messageType,
      owner: boolCheckOwner,
      message: item.message,
      time: item.createdAt,
      detail: {
        _id: item._id,
        senderID: item.senderID,
        name: members.get(item.senderID)?.userName,
        avatar: item.avatar,
        createdAt: item.createdAt,
        message: item.message,
        aka: !boolCheckOwner
          ? members.get(item.senderID)?.aka || members.get(item.senderID)?.userName
          : ''
      }
    }

    const time = item.createdAt
    if (item.type === MESSAGE_TYPE.NOTIFY) {
      return (
        <Text style={{ textAlign: 'center', fontWeight: '400', fontSize: 13 }}>{item.message}</Text>
      )
    }
    if (!beforeItem) {
      //first message => having avatar, time
      return (
        <config.messageType
          _id={config._id}
          onLayout={onLayout}
          index={index}
          senderID={config.senderID}
          avatar={config.avatar}
          message={config.message}
          style={config.style}
          owner={config.owner}
          time={config.time}
          onLongPress={onLongPress}
          aka={config.detail.aka}
          detail={config.detail}
        />
      )
    } else if (item.senderID !== beforeItem.senderID) {
      //single chat or first in multichat from 1 person
      return (
        <config.messageType
          _id={config._id}
          onLayout={onLayout}
          index={index}
          senderID={config.senderID}
          message={config.message}
          messageTime={config.time}
          avatar={config.avatar}
          owner={config.owner}
          onLongPress={onLongPress}
          detail={config.detail}
          aka={config.detail.aka}

          // style={config.style}
        />
      )
    } else {
      // multichat => having avatar & time
      const beforeTime = beforeItem.createdAt
      const timeSpace = helper.DateTimeHelper.compareTwoDateByDate(time, beforeTime, 'hour')

      return timeSpace >= 1 ? (
        <config.messageType
          _id={config._id}
          onLayout={onLayout}
          index={index}
          senderID={config.senderID}
          message={config.message}
          time={config.time}
          messageTime={config.time}
          avatar={config.avatar}
          aka={config.detail.aka}
          owner={config.owner}
          onLongPress={onLongPress}
          detail={config.detail}
          // style={config.style}
        />
      ) : (
        // multi message from anyone => having avatar, not time
        <config.messageType
          _id={config._id}
          onLayout={onLayout}
          index={index}
          senderID={config.senderID}
          message={config.message}
          style={config.style}
          owner={config.owner}
          messageTime={config.time}
          onLongPress={onLongPress}
          detail={config.detail}
        />
      )
    }
  }
)

export default ChatItem
