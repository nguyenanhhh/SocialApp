import { Image, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { styles } from './style'
import RowComponent from '../../../../../components/RowComponent'
import { MESSAGE_TYPE } from '../../../../../utils/Constants'
import { API } from '../../../../../api'
import EnhancedImageViewing from 'react-native-image-viewing'
import VideoComponent from '../../../../../components/VideoComponent'

const OwnerMessage = ({ message, messageType, time, onPress }) => {
  const getImage = (sourse) => API.getFileUrl(sourse)

  const [imageList, setImageList] = useState([])
  const [imageViewState, setImageViewState] = useState(false)
  const [imageViewIndex, setImageViewIndex] = useState(0)

  useEffect(() => {
    if (messageType === MESSAGE_TYPE.IMAGE) {
      const newArr = message.split(',')
      const urlArr = newArr.map((item) => {
        return { uri: getImage(item) }
      })
      setImageList(urlArr)
    }
  }, [])
  const handleClickImage = (id) => {
    setImageViewIndex(id)
    setImageViewState(true)
  }
  return (
    <RowComponent onPress={onPress} style={styles.container}>
      {messageType === MESSAGE_TYPE.TEXT && <Text style={styles.message}>{message}</Text>}
      {messageType === MESSAGE_TYPE.IMAGE && (
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'flex-end',
            flexWrap: 'wrap',
            maxWidth: '78%'
          }}
        >
          {message.split(',').map((item, index) => (
            <TouchableOpacity
              key={'message image' + index}
              onPress={() => handleClickImage(index)}
              style={{
                width: `${message.split(',').length < 3 ? 75 / message.split(',').length : 25}%`,
                height: 100,
                marginLeft: 12,
                marginBottom: 12
              }}
            >
              <Image  source={{ uri: getImage(item) }} width={'100%'} height={'100%'} />
            </TouchableOpacity>
          ))}
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
      )}
      {messageType === MESSAGE_TYPE.VIDEO && (
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'flex-end',
            flexWrap: 'wrap',
            maxWidth: '74%',
          }}
        >
          {message.split(',').map((item, index) => (
            <VideoComponent
              key={'video' + index}
              source={getImage(item)}
              width = {100}
              height={100}
            />
          ))}
        </View>
      )}
    </RowComponent>
  )
}

export default React.memo(OwnerMessage)
