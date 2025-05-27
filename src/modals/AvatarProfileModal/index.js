import { View, Text, StyleSheet, Pressable, Modal, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import SpaceComponent from '../../components/SpaceComponent'
import Ionicons from 'react-native-vector-icons/Ionicons'
import EnhancedImageViewing from 'react-native-image-viewing'
import { API } from '../../api'
import ImageLibrary from '../../components/ImageLibrary'
import { MESSAGE_TYPE } from '../../utils/Constants'
import RNFS from 'react-native-fs'

const SelectionItem = ({ title, onPress, iconName }) => {
  return (
    <TouchableOpacity onPress={onPress} style={{ flexDirection: 'row' }}>
      <Ionicons name={iconName} size={24} />
      <SpaceComponent width={8} />
      <Text style={{ color: '#000', fontWeight: '400', fontSize: 16 }}>{title}</Text>
    </TouchableOpacity>
  )
}

const AvatarProfileModal = ({ modalVisible, onClose, userID, ownerID, avatar }) => {
  const [viewAvatar, setViewAvatar] = useState(false)
  const handleCloseModal = () => onClose()
  const handleShowAvatar = () => setViewAvatar(true)

  const [preUploadModal, setPreUploadModal] = useState(false)
  const handleCLosePreUpload = () => setPreUploadModal(false)
  const handleShowPreUpload = () => setPreUploadModal(true)
  const handleHideAvatar = () => {
    setViewAvatar(false)
    onClose()
  }

  const handleChosenFile = async (value) => {
    const { customPath } = value[0]
    const base64 = await RNFS.readFile(customPath, 'base64')
    API.updateUserAvatarAPI(ownerID, avatar, base64).then(data => {
      onClose()
    })
  }

  return ownerID === userID ? (
    <Modal
      animationType="fade"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        handleCloseModal
      }}
    >
      <Pressable style={styles.pressableContainer} onPress={handleCloseModal}>
        <Pressable style={styles.pressableBody} onPress={(e) => e.stopPropagation()}>
          <View style={styles.modalContainer}>
            <View>
              <SpaceComponent height={16} />
              <SelectionItem
                onPress={handleShowAvatar}
                iconName={'person-circle-outline'}
                title={'Xem ảnh đại diện'}
              />
              <SpaceComponent height={24} />
              <ImageLibrary
                limit={1}
                type={MESSAGE_TYPE.IMAGE}
                callback={handleChosenFile}
                text={'Đổi ảnh đại diện'}
                spacing={8}
                textStyle={{ fontWeight: '400', color: '#000', fontSize: 16 }}
              >
                <Ionicons name="image-outline" size={24} />
              </ImageLibrary>
              <SpaceComponent height={16} />
            </View>
            <EnhancedImageViewing
              onRequestClose={handleHideAvatar}
              visible={viewAvatar}
              imageIndex={0}
              images={[{ uri: API.getFileUrl(avatar) }]}
            />
          </View>
        </Pressable>
      </Pressable>
    </Modal>
  ) : (
    <EnhancedImageViewing
      onRequestClose={() => {
        onClose()
      }}
      visible={modalVisible}
      imageIndex={0}
      images={[{ uri: API.getFileUrl(avatar) }]}
    />
  )
}

export default AvatarProfileModal

const styles = StyleSheet.create({
  pressableContainer: {
    flex: 1,
    position: 'relative',
    backgroundColor: 'rgba(0, 0, 0, 0.3)'
  },

  pressableBody: {
    position: 'absolute',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    bottom: 0,
    left: 0,
    right: 0
  },

  modalContainer: {
    borderWidth: 1,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderColor: '#aaa',
    backgroundColor: '#fff',
    paddingTop: 10,
    paddingLeft: 8
  },
  modalTitle: {
    textAlign: 'center',
    marginTop: 10,
    marginLeft: 10,
    color: '#a2f',
    fontSize: 16,
    fontWeight: '500'
  }
})
