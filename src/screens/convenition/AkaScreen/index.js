import { View, Text, Button, Modal, Pressable, TextInput, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import SpaceComponent from '../../../components/SpaceComponent'
import RowComponent from '../../../components/RowComponent'
import AvatarComponent from '../../../components/AvatarComponent'
import { API } from '../../../api'
import { useCustomContext } from '../../../store'
import { MESSAGE_NOTIFY_STATUS, MESSAGE_NOTIFY_TYPE, MESSAGE_TYPE } from '../../../utils/Constants'
import { OpacityButtton } from '../../../components/ButtonComponent'
import GoBackComponent from '../../../components/GoBackComponent'
import SocketClient from '../../../socket'
import { useSelector } from 'react-redux'
import { selectCurrentUser } from '~/redux/slice/userSlice'

const CustomModal = ({ modalVisible, onClose, onClear, onUpdate, aka }) => {
  const [inputValue, setInputValue] = useState('')

  const handleInputChange = (value) => setInputValue(value)
  const handleCloseModal = () => onClose(false)
  const handelClear = () => {
    if(aka) {
      onClear()
    }
    handleCloseModal()
  }
  const handleUpdate = () => {
    handleCloseModal()
    onUpdate(inputValue)
  }

  useEffect(() => {
    setInputValue(aka)
  }, [])

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        onClose(!modalVisible)
      }}
    >
      <Pressable style={{ flex: 1 }} onPress={handleCloseModal}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Chỉnh sửa biệt danh</Text>
          <SpaceComponent height={24} />
          <TextInput
            style={styles.modalTextInput}
            placeholder="Thêm biệt danh..."
            value={inputValue}
            focusable={true}
            onChangeText={handleInputChange}
          />
          <SpaceComponent height={16} />
          <RowComponent
            alignItems
            style={{ marginVertical: 10, marginHorizontal: 32, justifyContent: 'space-between' }}
          >
            <OpacityButtton
              title={'Hủy'}
              textStyle={styles.modalBtnText}
              style={styles.modelBtn}
              onPress={handleCloseModal}
            />
            <RowComponent>
              <OpacityButtton
                title={'Gỡ'}
                textStyle={styles.modalBtnText}
                style={styles.modelBtn}
                onPress={handelClear}
              />
              <SpaceComponent width={24} />
              <OpacityButtton
                title={'Lưu'}
                textStyle={styles.modalBtnText}
                style={styles.modelBtn}
                onPress={handleUpdate}
              />
            </RowComponent>
          </RowComponent>
          <SpaceComponent height={8} />
        </View>
      </Pressable>
    </Modal>
  )
}

const AkaScreen = ({ navigation, route }) => {
  const { conventionID, members, handleChangeAkaName } = route.params
  const [memberData, setMemberData] = useState(members)
  const [modalVisible, setModalVisible] = useState(false)
  const [chosenMember, setChosenMember] = useState({})
  const state = useSelector(selectCurrentUser)

  const handleSetVisible = (data) => setModalVisible(data)

  const handleEditAka = (item) => {
    setChosenMember(item)
    setModalVisible(true)
  }
  const handleUpdateNickName = (value) => {
    const data = {
      senderID: state._id,
      type: MESSAGE_TYPE.NOTIFY,
      newState: value,
      userID: chosenMember._id,
      notify: {
        type: MESSAGE_NOTIFY_TYPE.CHANGE_AKA,
        action: MESSAGE_NOTIFY_STATUS.UPDATE,
        changedID: chosenMember._id,
        value: value
      },
      customMessage: `${state.userName} đã đặt biệt danh cho ${chosenMember.userName} là ${value}`
    }
    API.sendMessageAPI({
      conventionID,
      data: data,
      senderName: state.userName,
      senderAvatar: state.avatar
    }).then((response) => {
      // SocketClient.emitChangeConventionAka(conventionID, chosenMember._id, value)
    })
    setMemberData((pre) => {
      return [
        ...pre.map((item) => {
          if (item._id === chosenMember._id) {
            return { ...item, aka: value }
          } else {
            return item
          }
        })
      ]
    })
  }

  const handleClearNickName = () => {
    const data = {
      senderID: state._id,
      type: MESSAGE_TYPE.NOTIFY,
      newState: '',
      userID: chosenMember._id,
      notify: {
        type: MESSAGE_NOTIFY_TYPE.CHANGE_AKA,
        action: MESSAGE_NOTIFY_STATUS.CLEAR,
        changedID: chosenMember._id
      },
      customMessage: `${state.userName} đã xóa biệt danh của ${chosenMember.userName}`
    }
    API.sendMessageAPI({
      conventionID,
      data: data,
      senderName: state.userName,
      senderAvatar: state.avatar
    })
    setMemberData((pre) => {
      return [
        ...pre.map((item) => {
          if (item._id === chosenMember._id) {
            return { ...item, aka: '' }
          } else {
            return item
          }
        })
      ]
    })
  }

  return (
    <View style={{ marginHorizontal: 16 }}>
      <GoBackComponent title={'Biệt danh'} hasBorder />
      <SpaceComponent height={24} />
      {memberData.map((item, index) => (
        <RowComponent
          onPress={() => handleEditAka(item)}
          alignItems
          key={index}
          style={{ marginBottom: 16 }}
        >
          <AvatarComponent size={48} source={API.getFileUrl(item.avatar)} />
          <SpaceComponent width={16} />
          <View>
            <Text style={{ fontWeight: '700', fontSize: 16 }}>{item.userName}</Text>
            <Text>{item.aka || 'Thêm biệt danh...'}</Text>
          </View>
        </RowComponent>
      ))}
      {modalVisible && (
        <CustomModal
          onClose={handleSetVisible}
          onClear={handleClearNickName}
          onUpdate={handleUpdateNickName}
          modalVisible={true}
          aka={chosenMember.aka}
        />
      )}
    </View>
  )
}

export default AkaScreen

const styles = StyleSheet.create({
  modalContainer: {
    borderRadius: 20,
    backgroundColor: '#fff',
    marginTop: '50%',
    marginHorizontal: 40,
    borderColor: '#ccc',
    borderWidth: 1
  },
  modalTitle: {
    textAlign: 'center',
    marginTop: 10,
    marginLeft: 10,
    color: '#000',
    fontWeight: '500'
  },
  modalTextInput: { borderBottomColor: '#ccc', borderBottomWidth: 1, paddingBottom: 2 },
  modalBtnText: {
    color: 'blue',
    fontWeight: '400',
    fontSize: 16
  },
  modelBtn: {
    padding: 4
  }
})
