import { View, Text, Image, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import EnhancedImageViewing from 'react-native-image-viewing'
import { helper } from '../../../../../../../utils/helpers'
import { API } from '../../../../../../../api'
import ChatAvatar from '../ChatAvatar'
import SpaceComponent from '../../../../../../../components/SpaceComponent'
import RowComponent from '../../../../../../../components/RowComponent'

const ImageMessage = React.memo(
  ({
    _id,
    onLayout,
    index,
    senderID,
    message,
    owner,
    aka,
    time,
    messageTime,
    avatar,
    onLongPress,
    detail
  }) => {
    const [imageList, setImageList] = useState(() => {
      return message.split(',').map((item) => ({ uri: API.getFileUrl(item) }))
    })

    const [imageViewState, setImageViewState] = useState(false)
    const [imageViewIndex, setImageViewIndex] = useState(0)
    const formatTime = time ? helper.DateTimeHelper.displayTimeDescendingFromDate(time) : null

    const handleClickImage = (id) => {
      setImageViewIndex(id)
      setImageViewState(true)
    }
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
          <View
            style={{
              // backgroundColor: '#456',
              flexDirection: owner ? 'row-reverse' : 'row',
              flexWrap: owner ? 'wrap-reverse' : 'wrap',
              maxWidth: '78%'
            }}
          >
            {message.split(',').map((item, index) => (
              <TouchableOpacity
                key={'message image' + index}
                onPress={() => handleClickImage(index)}
                onLongPress={handleLongPress}
                style={{
                  width: `${message.split(',').length < 3 ? 91 / message.split(',').length : 25}%`,
                  height: 100,
                  marginLeft: 12,
                  marginBottom: 12
                }}
              >
                <Image
                  source={imageList.at(index)}
                  width={'100%'}
                  height={'100%'}
                  style={{ borderWidth: 1, borderColor: '#ddd' }}
                  resizeMode="cover"
                />
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <EnhancedImageViewing
          images={imageList}
          keyExtractor={(img, index) => index}
          imageIndex={imageViewIndex}
          onImageIndexChange={(id) => setImageViewIndex(id)}
          visible={imageViewState}
          swipeToCloseEnabled
          onRequestClose={() => setImageViewState(false)}
        />
      </View>
    )
  }
)

export default ImageMessage
