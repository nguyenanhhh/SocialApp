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
import SpaceComponent from '../../../../../components/SpaceComponent'
import { OpacityButtton } from '../../../../../components/ButtonComponent'
import RowComponent from '../../../../../components/RowComponent'
import { TextInput } from 'react-native-gesture-handler'
import { API } from '../../../../../api'
import { MESSAGE_ACTION } from '../../../../../utils/Constants'
import { helper } from '../../../../../utils/helpers'
import TextComponent from '~/components/TextComponent'
import Octicons from 'react-native-vector-icons/Octicons'

const SelectionItem = ({ title, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Text style={{ paddingVertical: 8 }}>{title}</Text>
    </TouchableOpacity>
  )
}

const NormalOption = ({ callback, onClose, item, ownerID }) => {
  const handle = {
    EDIT: () => callback(EDIT),
    REMOVE: () => callback(REMOVE),
    DELETE: () => callback(DELETE),
    DETAIL: () => callback(DETAIL),
  }

  return (
    <View>
      <RowComponent>
        <TextComponent text="Tùy chọn" size={24} color="blue" align="center" style={{ flex: 1 }} />
        <OpacityButtton padding={4} onPress={onClose}>
          <Octicons name="x" size={24} />
        </OpacityButtton>
        <SpaceComponent width={12}/>
      </RowComponent>
      <SpaceComponent height={12} />
      {item.senderID === ownerID ? (
        <View>
          <SelectionItem title={'Chỉnh sửa tin nhắn'} onPress={handle.EDIT} />
          <SelectionItem title={'Thu hồi tin nhắn'} onPress={handle.REMOVE} />
          <SelectionItem title={'Xóa tin nhắn'} onPress={handle.DELETE} />
          <SelectionItem title={'Xem thông tin chi tiết'} onPress={handle.DETAIL} />
        </View>
      ) : (
        <SelectionItem title={'Xem thông tin chi tiết'} onPress={handle.DETAIL} />
      )}
    </View>
  )
}

const EditOption = ({ onClose, onSubmit, value }) => {
  const [inputValue, setInputValue] = useState(value)

  const handleOnClose = () => onClose()
  const handleOnSubmit = () => onSubmit({ message: inputValue, type: MESSAGE_ACTION.EDIT })
  const handleTextChange = (state) => setInputValue(state)

  return (
    <View>
      <TextComponent text="Chỉnh sửa tin nhắn" size={24} color="blue" align="center" />

      <TextInput
        focusable
        style={{ paddingBottom: 2, borderBottomColor: '#ccc', borderBottomWidth: 1 }}
        value={inputValue}
        onChangeText={handleTextChange}
      />
      <SpaceComponent height={16} />
      <RowComponent>
        <OpacityButtton onPress={handleOnClose} style={{ flex: 1 }} title={'Hủy'} />
        <OpacityButtton submit onPress={handleOnSubmit} style={{ flex: 1 }} title={'Xác nhận'} />
      </RowComponent>
    </View>
  )
}

const RemoveOption = ({ onClose, onSubmit }) => {
  const handleOnClose = () => onClose()
  const handleOnSubmit = () =>
    onSubmit({ type: MESSAGE_ACTION.REMOVE, message: 'Tin nhắn này đã bị thu hồi' })
  return (
    <View>
      <Text style={styles.modalTitle}>Bạn có chắc thu hồi tin nhắn này?</Text>
      <SpaceComponent height={24} />
      <RowComponent>
        <OpacityButtton onPress={handleOnClose} style={{ flex: 1 }} title={'Hủy'} />
        <OpacityButtton submit onPress={handleOnSubmit} style={{ flex: 1 }} title={'Xác nhận'} />
      </RowComponent>
    </View>
  )
}

const DeleteOption = ({ onClose, onSubmit, item, callback, ownerID }) => {
  const handleOnClose = () => onClose()
  const handleOnSubmit = () => onSubmit({ type: MESSAGE_ACTION.DELETE })
  const subTime = helper.DateTimeHelper.compareTwoDateByTimeStamp(
    Date.now(),
    Date.parse(item.createdAt),
    'hour'
  )

  if (subTime > 1) {
    ToastAndroid.show('Tin nhắn đã gửi quá 1 giờ ', ToastAndroid.SHORT)
    return <NormalOption callback={callback} item={item} ownerID={ownerID} />
  } else {
    return (
      <View>
        <Text style={styles.modalTitle}>Bạn có chắc xóa tin nhắn này?</Text>
        <SpaceComponent height={24} />
        <RowComponent>
          <OpacityButtton onPress={handleOnClose} style={{ flex: 1 }} title={'Hủy'} />
          <OpacityButtton submit onPress={handleOnSubmit} style={{ flex: 1 }} title={'Xác nhận'} />
        </RowComponent>
      </View>
    )
  }
}

const DetailItem = ({ title, value }) => {
  return (
    <RowComponent>
      <Text style={{ width: 80 }}>{title}</Text>
      <SpaceComponent width={8} />
      <Text>{value}</Text>
    </RowComponent>
  )
}
const DetailOption = ({ item }) => {
  return (
    <View>
      <DetailItem title={'Người gửi:'} value={item.name} />
      <DetailItem
        title={'Thời gian:'}
        value={helper.DateTimeHelper.displayTimeDescendingFromDate(item.createdAt)}
      />
    </View>
  )
}

const NORMAL = 'NORMAL'
const EDIT = 'EDIT'
const REMOVE = 'REMOVE'
const DELETE = 'DELETE'
const DETAIL = 'DETAIL'
const CLOSE = 'CLOSE'

const ChatItemModal = ({ modalVisible, onClose, item, members, conventionID, ownerID }) => {
  const [option, setOption] = useState(NORMAL)

  const handleCloseModal = () => {
    handleSelect(NORMAL)
    onClose()
  }

  const handleSelect = (value) => setOption(value)
  const handleSubmit = (data) => {
    API.updateMessage(conventionID, item._id, {
      message: data.message || item.message,
      type: data.type
    })
    handleSelect(NORMAL)
    onClose()
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
            {option === NORMAL ? (
              <NormalOption callback={handleSelect} onClose={handleCloseModal} item={item} ownerID={ownerID} />
            ) : option === EDIT ? (
              <EditOption onClose={handleCloseModal} onSubmit={handleSubmit} value={item.message} />
            ) : option === REMOVE ? (
              <RemoveOption onClose={handleCloseModal} onSubmit={handleSubmit} />
            ) : option === DELETE ? (
              <DeleteOption
                onClose={handleCloseModal}
                onSubmit={handleSubmit}
                callback={handleSelect}
                item={item}
                ownerID={ownerID}
              />
            ) : (
              <DetailOption item={item} />
            )}
          </View>
        </Pressable>
      </Pressable>
    </Modal>
  )
}

export default ChatItemModal

const styles = StyleSheet.create({
  pressableContainer: {
    flex: 1,
    position: 'relative',
    backgroundColor: '#1113'
  },

  pressableBody: {
    backgroundColor: 'eee',
    position: 'absolute',
    top: '20%',
    left: 0,
    right: 0
  },
  modalContainer: {
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#bbb',
    backgroundColor: '#fff',
    marginHorizontal: 12,
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
