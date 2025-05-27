import { View, Text, Modal, Pressable, StyleSheet, ToastAndroid } from 'react-native'
import React, { useState } from 'react'
import { OpacityButtton } from '../components/ButtonComponent'
import { navigationRef } from '../store'
import PopUpModal from './PopUpModal'
import { API } from '../api'
import SpaceComponent from '~/components/SpaceComponent'

const GroupMemberModal = ({ modalVisible, navigation, onClose, item, onDelete, onBlock }) => {
  const [itemModal, setItemModal] = useState(false)
 const [action, setAction] = useState({title: '', subtitle: '', onSubmit: () => {} })
  const onShowItemModal = () => setItemModal(true)
  const onHideItemModal = () => setItemModal(false)
  const handleCloseModal = () => onClose()

  const handlePressGroupUser = () => {
    onClose()
    navigation.navigate('GroupUserScreen', { userID: item.userID, groupID: item.groupID, item })
  }
  
  const handleBlockMember = () => {
    setAction({
      title: `Chặn người dùng ${item.userName}`,
      subtitle: `${item.userName} sẽ không thể truy cập vào nhóm`,
      onSubmit: () => { onBlock(); onHideItemModal(); handleCloseModal()}
    })
    onShowItemModal()
  }
  const handleDeleteMember = () => {
    setAction({
      title: `Xóa người dùng ${item.userName}`,
      subtitle: `${item.userName} sẽ bị xóa khỏi nhóm`,
      onSubmit: () => { onDelete(); onHideItemModal(); handleCloseModal()}
    })
    onShowItemModal()
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
      <Pressable style={{ flex: 1, backgroundColor:'rgba(0, 0,0,0.3)' }} onPress={handleCloseModal}>
        <View style={styles.modalContainer}>
          <OpacityButtton left textSize={18} title={'Xem thông tin'} onPress={handlePressGroupUser} />
          <SpaceComponent height={8} />
          <OpacityButtton left textSize={18} title={'Xóa thành viên'} onPress={handleDeleteMember}/>
          <SpaceComponent height={8} />
          <OpacityButtton left textSize={18} title={'Chặn khỏi nhóm'} onPress={handleBlockMember} />
          <SpaceComponent height={8} />
          <OpacityButtton left textSize={18} title={'Nâng cấp thành quản trị viên'} />
          <SpaceComponent height={8} />
          <OpacityButtton left textSize={18} title={'Nâng cấp thành admin'} />
          <SpaceComponent height={8} />
        </View>
      </Pressable>
      <PopUpModal
        modalVisible={itemModal}
        onCancle={onHideItemModal}
        title={action.title}
        subtitle={action.subtitle}
        onSubmit={action.onSubmit}
      />
    </Modal>
  )
}

const styles = StyleSheet.create({
  modalContainer: {
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#bbb',
    backgroundColor: '#fff',
    marginTop: '50%',
    marginHorizontal: 20,
    paddingVertical: 12,
    paddingLeft: 16
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

export default GroupMemberModal
