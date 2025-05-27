import { View, Text, Pressable } from 'react-native'
import React, { useState } from 'react'
import VideoComponent from '../../../../../../../components/VideoComponent'
import { API } from '../../../../../../../api'
import ChatAvatar from '../ChatAvatar'
import { helper } from '../../../../../../../utils/helpers'
import RowComponent from '../../../../../../../components/RowComponent'
import SpaceComponent from '../../../../../../../components/SpaceComponent'

const VideoMessage = React.memo(
  ({
    _id,
    onLayout,
    index,
    senderID,
    message,
    owner,
    aka,
    style,
    time,
    messageTime,
    avatar,
    onLongPress,
    detail
  }) => {
    const formatTime = time ? helper.DateTimeHelper.displayTimeDescendingFromDate(time) : null
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
        <View style={{ flexDirection: owner ? 'row-reverse' : 'row' }}>
          {!owner && <ChatAvatar avatar={API.getFileUrl(avatar)} size={30} />}
          <RowComponent
            style={{
              flexDirection: owner ? 'row-reverse' : 'row',
              flexWrap: 'wrap',
              maxWidth: '74%'
            }}
          >
            {message.split(',').map((item, index) => (
              <VideoComponent
                onLongPress={handleLongPress}
                key={'video' + index}
                source={API.getFileUrl(item)}
                width={`${message.split(',').length < 3 ? 100 / message.split(',').length : 33}%`}
                height={message.split(',').length < 2 ? 200 : 100}
              />
            ))}
          </RowComponent>
        </View>
      </View>
    )
  }
)

export default VideoMessage
