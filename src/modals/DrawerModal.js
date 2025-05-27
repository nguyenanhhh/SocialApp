import { View, Text, StyleSheet, Pressable, Modal, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import SpaceComponent from '../components/SpaceComponent'
import TextComponent from '~/components/TextComponent'
import ImageLibrary from '~/components/ImageLibrary'
import { MESSAGE_TYPE } from '~/utils/Constants'


const SelectionItem = ({ title, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <TextComponent text={title} />
    </TouchableOpacity>
  )
}

const DrawerModal = ({ modalVisible, onClose, navigation, group, updateGroupAvatar }) => {
  const handleCloseModal = () => onClose()
  const handleEditGroupBio = () => {
    handleCloseModal()
    navigation.navigate('EditGroupScreen', {
      groupID: group._id,
      editValue: group.name,
      editType: 'bio'
    })
  }

  const handleEditGroupName = () => {
    handleCloseModal()
    navigation.navigate('EditGroupScreen', {
      groupID: group._id,
      editValue: group.name,
      editType: 'name'
    })
  }

  const handleClickPending = () => {
    handleCloseModal()
    navigation.navigate('GroupPendingScreen', { groupID: group._id, groupName: group.name })
  }

  const handleClickBlocking = () => {
    handleCloseModal()
    navigation.navigate('GroupBlockingScreen', { groupID: group._id, groupName: group.name })
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
            <View style={{ paddingLeft: 20 }}>
              <TextComponent color="blue" text={'Cài đặt nhóm'} />
              <SpaceComponent height={24} />
              <SelectionItem title={'Cập nhật tên nhóm'} onPress={handleEditGroupName} />
              {/* <SpaceComponent height={24} /> */}
              {/* <SelectionItem title={'Cập nhật avatar nhóm'} onPress={handleCloseModal} /> */}
             <SpaceComponent height={24} />
             <ImageLibrary
                limit={1}
                type={MESSAGE_TYPE.IMAGE}
                callback={updateGroupAvatar}
              >
                <TextComponent size={18} text="Cập nhật avatar nhóm" />
              </ImageLibrary>
              <SpaceComponent height={24} />
              <SelectionItem title={'Cập nhật phần mô tả nhóm'} onPress={handleEditGroupBio} />
              <SpaceComponent height={24} />
              <SelectionItem title={'Danh sách chờ duyệt'} onPress={handleClickPending} />
              <SpaceComponent height={24} />
              <SelectionItem title={'Danh sách bị chặn'} onPress={handleClickBlocking} />
              <SpaceComponent height={24} />
            </View>
            <SpaceComponent height={100} />
          </View>
        </Pressable>
      </Pressable>
    </Modal>
  )
}

export default DrawerModal

const styles = StyleSheet.create({
  pressableContainer: {
    flex: 1,
    position: 'relative',
    backgroundColor: 'rgba(0, 0, 0, 0.4)'
  },

  pressableBody: {
    backgroundColor: '#eee',
    position: 'absolute',
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
    left: 100,
    top: 0,
    right: 0,
    bottom: 0
  },

  modalContainer: {
    flex: 1,
    borderWidth: 1,
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
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
