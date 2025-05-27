import { View, Text, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import RNFS from 'react-native-fs'
import EnhancedImageViewing from 'react-native-image-viewing'
import AvatarComponent from '../../../components/AvatarComponent'
import SpaceComponent from '../../../components/SpaceComponent'
import ImageLibrary from '../../../components/ImageLibrary'
import { API } from '../../../api'
import { useCustomContext } from '../../../store'
import { MESSAGE_NOTIFY_STATUS, MESSAGE_NOTIFY_TYPE, MESSAGE_TYPE } from '../../../utils/Constants'
import GoBackComponent from '../../../components/GoBackComponent'
import { Socket } from 'socket.io-client'
import SocketClient from '../../../socket'
import { useSelector } from 'react-redux'
import { selectCurrentUser } from '~/redux/slice/userSlice'

const BackgroundConvention = ({ navigation, route }) => {
  const { conventionID } = route.params
  const [avatar, setAvatar] = useState(API.getFileUrl(route.params.avatar))
  const [imageViewState, setImageViewState] = useState(false)
  const [updated, setUpdated] = useState(false)
  const state = useSelector(selectCurrentUser)

  const handlePressAvatar = () => {
    setImageViewState(true)
  }
  const handleChoseImage = (data) => {
    setUpdated(true)
    setAvatar(data.at(0).uri)
  }

  const handleUpdate = async () => {
    const base64 = await RNFS.readFile(avatar, 'base64')
    const data = {
      senderID: state._id,
      type: MESSAGE_TYPE.NOTIFY,
      message: [base64],
      customMessage: `${state.userName} đã thay đổi ảnh đại diện đoạn chat`
    }
    API.sendMessageAPI({
      conventionID,
      data: data,
      senderName: state.userName,
      senderAvatar: state.avatar
    }).then(response => {
      // SocketClient.emitChangeConventionAvatar(conventionID, response.avatar)
      navigation.goBack()
    })
    setUpdated(false)
  }

  return (
    <View style={{ position: 'relative', height: '100%' }}>
      <GoBackComponent hasBorder marginLeft={8} title={'Avatar cuộc trò chuyện'} />
      <SpaceComponent height={80} />
      <View style={{ alignItems: 'center' }}>
        <AvatarComponent
          onPress={handlePressAvatar}
          style={{ borderWidth: 1, borderColor: '#ccc' }}
          source={avatar}
          size={240}
        />
        <SpaceComponent height={32} />
      </View>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <SpaceComponent width={12} />
        <ImageLibrary limit={1} callback={handleChoseImage} />
        <SpaceComponent width={12} />
        <Text>Thay avatar</Text>
      </View>
      <EnhancedImageViewing
        images={[{ uri: avatar }]}
        imageIndex={0}
        onImageIndexChange={(id) => id}
        visible={imageViewState}
        swipeToCloseEnabled
        onRequestClose={() => setImageViewState(false)}
      />
      <TouchableOpacity
      onPress={handleUpdate}
        style={{
          width: '100%',
          position: 'absolute',
          display: updated ? 'flex' : 'none',
          bottom: 0,
          backgroundColor: 'blue'
        }}
      >
        <Text
          style={{
            fontSize: 16,
            color: '#fff',
            fontWeight: 'bold',
            textAlign: 'center',
            marginVertical: 12
          }}
        >
          Cập nhật
        </Text>
      </TouchableOpacity>
    </View>
  )
}

export default BackgroundConvention
