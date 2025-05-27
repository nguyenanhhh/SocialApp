import { View, Text, StyleSheet, Pressable, Modal, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import SpaceComponent from '../components/SpaceComponent'
import RowComponent from '~/components/RowComponent'
import TextComponent from '~/components/TextComponent'
import Octicons from 'react-native-vector-icons/Octicons'

const SelectionItem = ({ title, onPress, icon }) => {
  return (
    <RowComponent onPress={onPress}>
      {icon}
      <SpaceComponent width={16} />
      <TextComponent text={title} />
    </RowComponent>
  )
}

const BottomModal = ({
  modalVisible,
  onClose,
  content,
  reactionStatus,
  ownerID,
  userID,
  onReply,
  onDelete,
  onEdit,
  onReact
}) => {
  const handleCloseModal = () => onClose()
  const handleEdit = () => {
    onEdit()
    onClose()
  }

  const handleDelete = () => {
    onDelete()
    onClose()
  }

  const handleReact = () => {
    onReact()
    onClose()
  }

  const handleReply = () => {
    onReply()
    onClose()
  }
  const handleCopy = () => {
    console.log(content)
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
              <SpaceComponent height={8} />
              <SelectionItem title={reactionStatus ?'Bỏ thích' : 'Thích'} onPress={handleReact} icon={<Octicons name='heart' size={20} />}  />
              <SpaceComponent height={20} />
              <SelectionItem title={'Trả lời'} onPress={handleReply} icon={<Octicons name='reply' size={20}/>} />
              <SpaceComponent height={20} />
              {ownerID === userID && (
                <>
                  <SelectionItem title={'Chỉnh sửa'} onPress={handleEdit} icon={<Octicons name='pencil' size={20} />} />
                  <SpaceComponent height={20} />
                  <SelectionItem title={'Thu hồi'} onPress={handleDelete} icon={<Octicons name='trash' size={20} />} />
                  <SpaceComponent height={20} />
                </>
              )}
              <SelectionItem title={'Sao chép nội dung'} onPress={handleCopy} icon={<Octicons name='copy' size={20} />} />
            </View>
            <SpaceComponent height={100} />
          </View>
        </Pressable>
      </Pressable>
    </Modal>
  )
}

export default BottomModal

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
