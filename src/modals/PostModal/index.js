import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Modal,
  TouchableOpacity,
  ToastAndroid
} from 'react-native'
import React, { useState } from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons'
import Octicons from 'react-native-vector-icons/Octicons'

import { navigationRef } from '../../store'
import SpaceComponent from '../../components/SpaceComponent'
import RowComponent from '../../components/RowComponent'
import ColumnComponent from '../../components/ColumnComponent'
import PopUpModal from '../PopUpModal'
import { API } from '../../api'
import { RESPONSE_STATUS } from '../../utils/Constants'

const SelectionItem = ({ title, onPress, iconName, iconSize }) => {
  return (
    <ColumnComponent>
      <RowComponent alignItems onPress={onPress}>
        <Octicons name={iconName} size={iconSize ?? 24} />
        <SpaceComponent width={8} />
        <TouchableOpacity onPress={onPress}>
          <Text style={{ paddingVertical: 8, color: '#000', fontSize: 16, fontWeight: '400' }}>
            {title}
          </Text>
        </TouchableOpacity>
      </RowComponent>
      <SpaceComponent height={8} />
    </ColumnComponent>
  )
}

const NormalOption = ({ selectOption, onEdit, ownerPostID, ownerID, onClose, groupID }) => {
  const handle = {
    REMOVE: () => selectOption(REMOVE),
    EDIT: () => {
      onClose()
      onEdit()
    },
    ROLE: () => {
      onClose()
      onEdit()
    }
  }

  return (
    <View style={{ backgroundColor: '#eee' }}>
      <SpaceComponent height={12} />
      <View style={{ backgroundColor: '#fff', paddingLeft: 16 }}>
        {ownerID === ownerPostID && (
          <View>
            <SpaceComponent height={8} />
            <SelectionItem iconName={'pencil'} title={'Chỉnh sửa bài viết'} onPress={handle.EDIT} />
            <SelectionItem
              iconName={'lock'}
              title={'Chỉnh sửa quyền riêng tư'}
              onPress={handle.EDIT}
            />
            <SelectionItem
              iconName={'trash'}
              title={ groupID ? 'Xóa bài viết' : 'Chuyển bài viết vào thùng rác'}
              onPress={handle.REMOVE}
            />
          </View>
        )}
        <SpaceComponent height={200} />
      </View>
    </View>
  )
}

const RemoveOption = ({ changeOption, onClose, postID }) => {
  const [modalVisible, setModalVisible] = useState(true)

  const handleCloseModal = () => {
    setModalVisible(false)
    changeOption()
  }
  const handleShowModal = () => {
    setModalVisible(true)
  }

  const handleSubmit = () => {
    API.trashPostAPI(postID).then((data) => {
      if (data === RESPONSE_STATUS.SUCCESS) {
        ToastAndroid.show('Đã chuyển bài viết vào thùng rác!', ToastAndroid.LONG)
      } else if (data === RESPONSE_STATUS.ERROR) {
        ToastAndroid.show('Lỗi khi chuyển bài viết vào thùng rác!!!', ToastAndroid.LONG)
      }
      handleCloseModal()
      onClose()
    })
  }
  return (
    <PopUpModal
      title={'Chuyển bài viết này vào thùng rác?'}
      onSubmit={handleSubmit}
      modalVisible={modalVisible}
      onCancle={handleCloseModal}
    />
  )
}

const NORMAL = 'MORMAL'
const REMOVE = 'REMOVE'

const PostModal = ({ modalVisible, onClose, ownerID, ownerPostID, postID, groupID }) => {
  const [option, setOption] = useState(NORMAL)

  const handleCloseModal = () => {
    handleSelect(NORMAL)
    onClose()
  }

  const handleSelect = (value) => setOption(value)
  const handleEdit = () => navigationRef.navigate('EditPostScreen', { postID, groupID })


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
            {option === NORMAL ? (
              <NormalOption
                ownerID={ownerID}
                ownerPostID={ownerPostID}
                onClose={handleCloseModal}
                onEdit={handleEdit}
                selectOption={handleSelect}
                groupID={groupID}
              />
            ) : (
              <RemoveOption
                postID={postID}
                onClose={handleCloseModal}
                changeOption={() => handleSelect(NORMAL)}
              />
            )}
          </View>
        </Pressable>
      </Pressable>
    </Modal>
  )
}

export default PostModal

const styles = StyleSheet.create({
  pressableContainer: {
    flex: 1,
    position: 'relative',
    backgroundColor: '#1113'
  },

  pressableBody: {
    backgroundColor:'eee',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0
  },

  modalContainer: {
    borderWidth: 1,
    // borderTopLeftRadius: 20,
    // borderTopRightRadius: 20,
    borderColor: '#aaa',
    backgroundColor: '#eee',
    marginVertical: 8,
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
