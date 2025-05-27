import { View, Text, StyleSheet, Pressable, Modal, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import SpaceComponent from '../components/SpaceComponent'
import RowComponent from '~/components/RowComponent'
import TextComponent from '~/components/TextComponent'
import Octicons from 'react-native-vector-icons/Octicons'
import SharingComponent from '~/components/Sharing'
import { SHARE_TYPE } from '~/utils/Constants'
import EditableModal from './EditableModal'
import { API } from '~/api'
import { useDispatch } from 'react-redux'
import { userAction } from '~/redux/slice/userSlice'
import { OpacityButtton } from '~/components/ButtonComponent'

const ProfileModel = ({ modalVisible, onClose, ownerId, user }) => {
  const dispatch = useDispatch()
  const handleCloseModal = () => onClose()
  const [updateNameModal, setUpdateNameModal] = useState(false)
  const showUpdateNameModal = () => setUpdateNameModal(true)
  const hideUpdateNameModal = () => setUpdateNameModal(false)
  const handleEditName = (value) => {
    API.updateUserNameAPI(user._id, value)
      .then((reponse) => {
        dispatch(userAction.updateCurrentUser({ userName: value }))
      })
      .finally(() => {
        hideUpdateNameModal()
        onClose()
      })
  }
  return (
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
            <SpaceComponent height={8} />
            <SharingComponent
              type={SHARE_TYPE.PROFILE}
              target={user}
              buttonTitle={'Chia sẻ trang cá nhân'}
            />
            <SpaceComponent height={12} />
            {ownerId === user._id && (
              <OpacityButtton
                fontWeight={'400'}
                textSize={18}
                title="Chỉnh sửa tên người dùng"
                onPress={showUpdateNameModal}
              />
            )}
            <EditableModal
              title="Thay đổi tên"
              content={user.userName}
              modalVisible={updateNameModal}
              onClose={hideUpdateNameModal}
              onSubmit={handleEditName}
            />
            <SpaceComponent height={100} />
          </View>
        </Pressable>
      </Pressable>
    </Modal>
  )
}

export default ProfileModel

const styles = StyleSheet.create({
  pressableContainer: {
    flex: 1,
    position: 'relative',
    backgroundColor: '#0002'
  },

  pressableBody: {
    backgroundColor: '#eee',
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
  }
})
